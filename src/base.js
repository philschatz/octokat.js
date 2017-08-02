const fetch = require('./adapters/fetch-node')
const plus = require('./plus')
const deprecate = require('./deprecate')
const Chainer = require('./chained')
const { VerbMethods, toPromise } = require('./verb-methods')

// Use the following plugins by default (they should be neglegible additional code)
const SimpleVerbsPlugin = require('./plugins/simple-verbs')

const Requester = require('./requester')
const applyHypermedia = require('./helpers/hypermedia')

// Checks if a response is a Buffer or not
const isBuffer = (data) => {
  if (typeof global['Buffer'] !== 'undefined') {
    return global['Buffer'].isBuffer(data)
  } else {
    // If `global` is not defined then we are not running inside Node so
    // the object could never be a Buffer.
    return false
  }
}

let uncamelizeObj = function (obj) {
  if (Array.isArray(obj)) {
    return (obj.map((i) => uncamelizeObj(i)))
  } else if (obj === Object(obj)) {
    let o = {}
    let iterable = Object.keys(obj)
    for (let j = 0; j < iterable.length; j++) {
      let key = iterable[j]
      let value = obj[key]
      o[plus.uncamelize(key)] = uncamelizeObj(value)
    }
    return o
  } else {
    return obj
  }
}

let OctokatBase = function (clientOptions = {}) {
  let plugins = clientOptions.plugins || [SimpleVerbsPlugin]

  // the octokat instance
  let instance = {}

  let fetchImpl = OctokatBase.Fetch || fetch

  let request = function (method, path, data, options = {raw: false, isBase64: false, isBoolean: false}, cb) {
    // replacer = new Replacer(request)

    // Use a slightly convoluted syntax so browserify does not include the
    // NodeJS Buffer in the browser version.
    // data is a Buffer when uploading a release asset file
    if (data && !isBuffer(data)) {
      data = uncamelizeObj(data)
    }

    // For each request, convert the JSON into Objects
    let requester = new Requester(instance, clientOptions, plugins, fetchImpl)

    return requester.request(method, path, data, options)
  }

  let verbMethods = new VerbMethods(plugins, {request})
  // attach all the possible methods
  Chainer(verbMethods, '', '', instance)

  // Special case for `me`
  instance.me = instance.user

  instance.parse = function (data) { // The signature of toPromise has cb as the 1st arg
    let context = {
      requester: {request},
      plugins,
      data,
      instance,
      clientOptions
    }
    return instance._parseWithContextPromise('', context)
  }

  // If not callback is provided then return a promise
  instance.parse = toPromise(instance.parse)

  instance._parseWithContextPromise = function (path, context) {
    let { data } = context
    if (data) {
      context.url = data.url || path
    }

    let responseMiddlewareAsyncs = plus.map(plus.filter(plugins, ({responseMiddlewareAsync}) => responseMiddlewareAsync), plugin => plugin.responseMiddlewareAsync.bind(plugin)
    )

    let prev = Promise.resolve(context)
    responseMiddlewareAsyncs.forEach((p) => {
      prev = prev.then(p)
    })
    return prev.then((val) => {
      return val.data
    })
  }

  // TODO remove this deprectaion too
  instance._fromUrlWithDefault = function (path, defaultFn, ...args) {
    path = applyHypermedia(path, ...args)
    Chainer(verbMethods, path, '', defaultFn)
    // verbMethods.injectVerbMethods(path, defaultFn)
    return defaultFn
  }

  instance.fromUrl = function (path, ...args) {
    let defaultFn = function (...args) {
      deprecate('call ....fetch() explicitly instead of ...()')
      return defaultFn.fetch(...args)
    }

    return instance._fromUrlWithDefault(path, defaultFn, ...args)
  }

  instance._fromUrlCurried = function (path, defaultFn) {
    let fn = function (...templateArgs) {
      // This conditional logic is for the deprecated .next_page() call
      if (defaultFn && templateArgs.length === 0) {
        return defaultFn.apply(fn)
      } else {
        return instance.fromUrl(path, ...templateArgs)
      }
    }

    if (!/\{/.test(path)) {
      verbMethods.injectVerbMethods(path, fn)
    }
    return fn
  }

  return instance
}

module.exports = OctokatBase
