plus = require './plus'
deprecate = require './deprecate'
{TREE_OPTIONS, OBJECT_MATCHER} = require './grammar'
Chainer = require './chainer'
injectVerbMethods = require './verb-methods'
# Replacer = require './replacer'

Request = require './request'
applyHypermedia = require './helpers/hypermedia'


# Combine all the classes into one client

reChainChildren = (plugins, request, url, obj) ->
  for key, re of OBJECT_MATCHER
    if re.test(obj.url)
      context = TREE_OPTIONS
      for k in key.split('.')
        context = context[k]
      Chainer(plugins, request, url, k, context, obj)
  obj


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
    _request = Request(instance, clientOptions, plugins)

    return _request method, path, data, options, (err, val) ->
      return cb(err) if err
      return cb(null, val) if options.raw

      unless disableHypermedia
        context = {
          data: val
          requestFn: _request
          instance
          clientOptions
        }
        obj = instance._parseWithContext(path, context)
        return cb(null, obj)
      else
        return cb(null, val)

  Chainer(plugins, request, '', null, TREE_OPTIONS, instance)

  # Special case for `me`
  instance.me = instance.user

  instance.parse = (data) ->
    context = {
      requestFn: request
      data
      instance
      clientOptions
    }
    instance._parseWithContext('', context)

  instance._parseWithContext = (path, context) ->
    {data, requestFn} = context
    url = data.url or path

    # TODO: Remove this check since it modifies the object
    context.options ?= {} # some plugins require this object to be set

    for plugin in plugins
      if plugin.responseMiddleware
        plus.extend(context, plugin.responseMiddleware(context))
    {data} = context

    # TODO: Move the chainer to a plugin since many people will not need this
    if url
      Chainer(plugins, requestFn, url, true, {}, data)
      reChainChildren(plugins, requestFn, url, data)
    else
      Chainer(plugins, requestFn, '', null, TREE_OPTIONS, data)
      # For the paged results, rechain all children in the array
      if Array.isArray(data)
        for datum in data
          reChainChildren(plugins, requestFn, datum.url, datum)
    data


  # TODO remove this depractaion too
  instance._fromUrlWithDefault = (path, defaultFn, args...) ->
    path = applyHypermedia(path, args...)
    injectVerbMethods(plugins, request, path, defaultFn)
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
      injectVerbMethods(plugins, request, path, fn)
    fn


  # Add the GitHub Status API https://status.github.com/api
  instance.status = instance.fromUrl('https://status.github.com/api/status.json')
  instance.status.api = instance.fromUrl('https://status.github.com/api.json')
  instance.status.lastMessage = instance.fromUrl('https://status.github.com/api/last-message.json')
  instance.status.messages = instance.fromUrl('https://status.github.com/api/messages.json')

  return instance


module.exports = OctokatBase
