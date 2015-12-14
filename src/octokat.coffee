_ = require 'lodash'
plus = require './plus'
deprecate = require './deprecate'
{TREE_OPTIONS, OBJECT_MATCHER} = require './grammar'
Chainer = require './chainer'
injectVerbMethods = require './verb-methods'
# Replacer = require './replacer'

Request = require './request'
{toPromise} = require './helper-promise'
applyHypermedia = require './helper-hypermedia'


MIDDLEWARE_REQUEST_PLUGINS = require './plugin-middleware-request'
MIDDLEWARE_RESPONSE_PLUGINS = require './plugin-middleware-response'
MIDDLEWARE_CACHE_HANDLER = require './plugin-cache-handler'

ALL_PLUGINS = MIDDLEWARE_REQUEST_PLUGINS.concat([
  MIDDLEWARE_RESPONSE_PLUGINS.READ_BINARY
  MIDDLEWARE_RESPONSE_PLUGINS.PAGED_RESULTS
  MIDDLEWARE_CACHE_HANDLER  # Run cacheHandler after PagedResults so the link headers are remembered
                            # but before hypermedia so the object is still serializable
  MIDDLEWARE_RESPONSE_PLUGINS.HYPERMEDIA
  MIDDLEWARE_RESPONSE_PLUGINS.CAMEL_CASE
])


# Combine all the classes into one client

reChainChildren = (request, url, obj) ->
  for key, re of OBJECT_MATCHER
    if re.test(obj.url)
      context = TREE_OPTIONS
      for k in key.split('.')
        context = context[k]
      Chainer(request, url, k, context, obj)
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


Octokat = (clientOptions={}) ->

  plugins = clientOptions.plugins or ALL_PLUGINS

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

  Chainer(request, '', null, TREE_OPTIONS, instance)

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
        _.extend(context, plugin.responseMiddleware(context))
    {data} = context

    # TODO: Move the chainer to a plugin since many people will not need this
    if url
      Chainer(requestFn, url, true, {}, data)
      reChainChildren(requestFn, url, data)
    else
      Chainer(requestFn, '', null, TREE_OPTIONS, data)
    data


  # TODO remove this depractaion too
  instance._fromUrlWithDefault = (path, defaultFn, args...) ->
    path = applyHypermedia(path, args...)
    injectVerbMethods(request, path, defaultFn)
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
      injectVerbMethods(request, path, fn)
    fn


  # Add the GitHub Status API https://status.github.com/api
  instance.status =     toPromise (cb) -> request('GET', 'https://status.github.com/api/status.json', null, null, cb)
  instance.status.api = toPromise (cb) -> request('GET', 'https://status.github.com/api.json', null, null, cb)
  instance.status.lastMessage = toPromise (cb) -> request('GET', 'https://status.github.com/api/last-message.json', null, null, cb)
  instance.status.messages = toPromise (cb) -> request('GET', 'https://status.github.com/api/messages.json', null, null, cb)

  return instance


module.exports = Octokat
