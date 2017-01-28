const plus = require('./plus')
const deprecate = require('./deprecate')
const TREE_OPTIONS = require('./grammar/tree-options')
const Chainer = require('./chainer')
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

  // TODO remove disableHypermedia
  let {disableHypermedia} = clientOptions
  // set defaults
  if (typeof disableHypermedia === 'undefined' || disableHypermedia === null) { disableHypermedia = false }

  // the octokat instance
  let instance = {}

  let request = function (method, path, data, options = {raw: false, isBase64: false, isBoolean: false}, cb) {
    // replacer = new Replacer(request)

    // Use a slightly convoluted syntax so browserify does not include the
    // NodeJS Buffer in the browser version.
    // data is a Buffer when uploading a release asset file
    if (data && !isBuffer(data)) {
      data = uncamelizeObj(data)
    }

    // For each request, convert the JSON into Objects
    let requester = new Requester(instance, clientOptions, plugins)

    return requester.request(method, path, data, options, function (err, val) {
      if (err) { return cb(err) }
      if ((options || {}).raw) { return cb(null, val) }

      if (!disableHypermedia) {
        let context = {
          data: val,
          plugins,
          requester,
          instance,
          clientOptions
        }
        return instance._parseWithContext(path, context, cb)
      } else {
        return cb(null, val)
      }
    }
    )
  }

  let verbMethods = new VerbMethods(plugins, {request});
  (new Chainer(verbMethods)).chain('', null, TREE_OPTIONS, instance)

  // Special case for `me`
  instance.me = instance.user

  instance.parse = function (cb, data) { // The signature of toPromise has cb as the 1st arg
    let context = {
      requester: {request},
      plugins,
      data,
      instance,
      clientOptions
    }
    return instance._parseWithContext('', context, cb)
  }

  // If not callback is provided then return a promise
  instance.parse = toPromise(instance.parse)

  instance._parseWithContext = function (path, context, cb) {
    if (typeof cb !== 'function') { throw new Error('Callback is required') }
    let { data } = context
    if (data) {
      context.url = data.url || path
    }

    let responseMiddlewareAsyncs = plus.map(plus.filter(plugins, ({responseMiddlewareAsync}) => responseMiddlewareAsync), plugin => plugin.responseMiddlewareAsync.bind(plugin)
    )

    // async.waterfall requires that the 1st entry take 0 arguments
    responseMiddlewareAsyncs.unshift(cb => cb(null, context))
    return plus.waterfall(responseMiddlewareAsyncs, function (err, val) {
      if (err) { return cb(err, val) }
      ({data} = val)
      return cb(err, data)
    }
    )
  }

  // TODO remove this deprectaion too
  instance._fromUrlWithDefault = function (path, defaultFn, ...args) {
    path = applyHypermedia(path, ...args)
    verbMethods.injectVerbMethods(path, defaultFn)
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
      // This conditional logic is for the deprecated .nextPage() call
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

  // Add the GitHub Status API https://status.github.com/api
  instance.status = instance.fromUrl('https://status.github.com/api/status.json')
  instance.status.api = instance.fromUrl('https://status.github.com/api.json')
  instance.status.lastMessage = instance.fromUrl('https://status.github.com/api/last-message.json')
  instance.status.messages = instance.fromUrl('https://status.github.com/api/messages.json')

  return instance
}

module.exports = OctokatBase
