plus = require './plus'
deprecate = require './deprecate'
TREE_OPTIONS = require './grammar/tree-options'
Chainer = require './chainer'
VerbMethods = require './verb-methods'

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

  plugins = clientOptions.plugins or []

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
          requester
          instance
          clientOptions
        }
        obj = instance._parseWithContext(path, context)
        return cb(null, obj)
      else
        return cb(null, val)


  verbMethods = new VerbMethods(plugins, {request})
  (new Chainer(verbMethods)).chain('', null, TREE_OPTIONS, instance)

  # Special case for `me`
  instance.me = instance.user

  instance.parse = (data) ->
    context = {
      requester: {request}
      data
      instance
      clientOptions
    }
    instance._parseWithContext('', context)

  instance._parseWithContext = (path, context) ->
    {data, requester} = context
    url = data.url or path

    for plugin in plugins
      if plugin.responseMiddleware
        plus.extend(context, plugin.responseMiddleware(context))
    {data} = context

    # TODO: Move the chainer to a plugin since many people will not need this
    # TODO: Figure out why this requestFn is better than the global requestFn
    verbMethods = new VerbMethods(plugins, requester)
    chainer = new Chainer(verbMethods)
    if url
      chainer.chain(url, true, {}, data)
      chainer.chainChildren(url, data)
    else
      chainer.chain('', null, {}, data)
      # For the paged results, rechain all children in the array
      if Array.isArray(data)
        for datum in data
          chainer.chainChildren(datum.url, datum)
    data


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
