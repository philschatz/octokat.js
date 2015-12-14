_ = require 'lodash'
plus = require './plus'
deprecate = require './deprecate'
{TREE_OPTIONS, OBJECT_MATCHER} = require './grammar'
Chainer = require './chainer'
injectVerbMethods = require './verb-methods'
# Replacer = require './replacer'
{CAMEL_CASE, HYPERMEDIA} = require './plugin-middleware-response'

Request = require './request'
{toPromise} = require './helper-promise'
applyHypermedia = require './helper-hypermedia'


MIDDLEWARE_REQUEST_PLUGINS = require './plugin-middleware-request'
MIDDLEWARE_RESPONSE_PLUGINS = require './plugin-middleware-response'
MIDDLEWARE_CACHE_HANDLER = require './plugin-cache-handler'
# MIDDLEWARE_RESPONSE_PLUGINS['CACHE_HANDLER'] = MIDDLEWARE_CACHE_HANDLER

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


parse = (data, path, requestFn, instance, clientOptions) ->
  url = data.url or path
  if url
    # Mostly copied from request.coffee
    acc = {
      clientOptions
      data
      options: {}
      # jqXHR # for cacheHandler
      # status:jqXHR.status # cacheHandler changes this
      # request:acc # Include the request data for plugins like cacheHandler
      requestFn # for Hypermedia to generate verb methods
      instance # for Hypermedia to be able to call `.fromUrl`
    }
    for plugin in ALL_PLUGINS
      if plugin.responseMiddleware
        acc2 = plugin.responseMiddleware(acc)
        _.extend(acc, acc2)
    {data} = acc

    Chainer(requestFn, url, true, {}, data)
    reChainChildren(requestFn, url, data)
  else
    Chainer(requestFn, '', null, TREE_OPTIONS, data)
  data


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
    _request = Request(instance, clientOptions, ALL_PLUGINS)

    return _request method, path, data, options, (err, val) ->
      return cb(err) if err
      return cb(null, val) if options.raw

      unless disableHypermedia
        obj = parse(val, path, request, instance, clientOptions)
        return cb(null, obj)
      else
        return cb(null, val)

  Chainer(request, '', null, TREE_OPTIONS, instance)

  # Special case for `me`
  instance.me = instance.user

  instance.parse = (jsonObj) ->
    parse(jsonObj, '', request, instance, clientOptions)


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
