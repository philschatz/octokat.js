plus = require './plus'
deprecate = require './deprecate'
TREE_OPTIONS = require './grammar/tree-options'
Chainer = require './chainer'
{VerbMethods, toPromise} = require './verb-methods'

# Use the following plugins by default (they should be neglegible additional code)
SimpleVerbsPlugin = require './plugins/simple-verbs'
NativePromiseOnlyPlugin = require './plugins/promise/native-only'

Requester = require './requester'
applyHypermedia = require './helpers/hypermedia'


uncamelizeObj = (obj) ->
  if Array.isArray(obj)
    return (uncamelizeObj(i) for i in obj)
  else if obj == Object(obj)
    o = {}
    for key in Object.keys(obj)
      value = obj[key]
      o[plus.uncamelize(key)] = uncamelizeObj(value)
    return o
  else
    return obj


OctokatBase = (clientOptions={}) ->

  plugins = clientOptions.plugins or [SimpleVerbsPlugin, NativePromiseOnlyPlugin]

  # TODO remove disableHypermedia
  {disableHypermedia} = clientOptions
  # set defaults
  disableHypermedia ?= false

  # the octokat instance
  instance = {}

  request = (method, path, data, options={raw:false, isBase64:false, isBoolean:false}, cb) ->
    # replacer = new Replacer(request)

    # Use a slightly convoluted syntax so browserify does not include the
    # NodeJS Buffer in the browser version.
    # data is a Buffer when uploading a release asset file
    if data and not global?['Buffer']?.isBuffer(data)
      data = uncamelizeObj(data)

    # For each request, convert the JSON into Objects
    requester = new Requester(instance, clientOptions, plugins)

    return requester.request method, path, data, options, (err, val) ->
      return cb(err) if err
      return cb(null, val) if options.raw

      unless disableHypermedia
        context = {
          data: val
          plugins
          requester
          instance
          clientOptions
        }
        return instance._parseWithContext(path, context, cb)
      else
        return cb(null, val)


  verbMethods = new VerbMethods(plugins, {request})
  (new Chainer(verbMethods)).chain('', null, TREE_OPTIONS, instance)

  # Special case for `me`
  instance.me = instance.user

  instance.parse = (cb, data) -> # The signature of toPromise has cb as the 1st arg
    context = {
      requester: {request}
      plugins
      data
      instance
      clientOptions
    }
    instance._parseWithContext('', context, cb)

  # If not callback is provided then return a promise
  {newPromise} = plugins.filter(({promiseCreator}) -> promiseCreator)[0].promiseCreator
  instance.parse = toPromise(instance.parse, newPromise)

  instance._parseWithContext = (path, context, cb) ->
    throw new Error('Callback is required') unless typeof cb is 'function'
    {data, requester} = context
    context.url = data?.url or path

    responseMiddlewareAsyncs = plus.map plus.filter(plugins, ({responseMiddlewareAsync}) -> responseMiddlewareAsync), (plugin) ->
      plugin.responseMiddlewareAsync.bind(plugin)

    # async.waterfall requires that the 1st entry take 0 arguments
    responseMiddlewareAsyncs.unshift((cb) -> cb(null, context))
    plus.waterfall responseMiddlewareAsyncs, (err, val) ->
      return cb(err, val) if err
      {data} = val
      cb(err, data)


  # TODO remove this deprectaion too
  instance._fromUrlWithDefault = (path, defaultFn, args...) ->
    path = applyHypermedia(path, args...)
    verbMethods.injectVerbMethods(path, defaultFn)
    defaultFn

  instance.fromUrl = (path, args...) ->
    defaultFn = (args...) ->
      deprecate('call ....fetch() explicitly instead of ...()')
      defaultFn.fetch(args...)

    instance._fromUrlWithDefault(path, defaultFn, args...)

  instance._fromUrlCurried = (path, defaultFn) ->
    fn = (templateArgs...) ->
      # This conditional logic is for the deprecated .nextPage() call
      if defaultFn and templateArgs.length is 0
        defaultFn.apply(fn)
      else
        instance.fromUrl(path, templateArgs...)

    unless /\{/.test(path)
      verbMethods.injectVerbMethods(path, fn)
    fn


  # Add the GitHub Status API https://status.github.com/api
  instance.status = instance.fromUrl('https://status.github.com/api/status.json')
  instance.status.api = instance.fromUrl('https://status.github.com/api.json')
  instance.status.lastMessage = instance.fromUrl('https://status.github.com/api/last-message.json')
  instance.status.messages = instance.fromUrl('https://status.github.com/api/messages.json')

  return instance


module.exports = OctokatBase
