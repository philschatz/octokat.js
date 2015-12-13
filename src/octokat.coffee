plus = require './plus'
{TREE_OPTIONS, OBJECT_MATCHER} = require './grammar'
Chainer = require './chainer'
injectVerbMethods = require './verb-methods'
# Replacer = require './replacer'
{CAMEL_CASE, HYPERMEDIA} = require './plugin-middleware-response'

Request = require './request'
{toPromise} = require './helper-promise'


MIDDLEWARE_REQUEST_PLUGINS = require './plugin-middleware-request'
MIDDLEWARE_RESPONSE_PLUGINS = require './plugin-middleware-response'
MIDDLEWARE_CACHE_HANDLER = require './plugin-cache-handler'
# MIDDLEWARE_RESPONSE_PLUGINS['CACHE_HANDLER'] = MIDDLEWARE_CACHE_HANDLER

ALL_PLUGINS = MIDDLEWARE_REQUEST_PLUGINS.concat([
  MIDDLEWARE_RESPONSE_PLUGINS.READ_BINARY
  MIDDLEWARE_RESPONSE_PLUGINS.PAGED_RESULTS
  MIDDLEWARE_RESPONSE_PLUGINS.HYPERMEDIA
  MIDDLEWARE_RESPONSE_PLUGINS.CAMEL_CASE
  MIDDLEWARE_CACHE_HANDLER
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


parse = (obj, path, requestFn) ->
  url = obj.url or path
  if url
    {data: obj} = HYPERMEDIA.responseMiddleware({requestFn, data:obj})
    # TODO: Refactor: make this loop through all installed responseMiddleware plugins
    {data: obj} = CAMEL_CASE.responseMiddleware({data: obj})

    Chainer(requestFn, url, true, {}, obj)
    reChainChildren(requestFn, url, obj)
  else
    Chainer(requestFn, '', null, TREE_OPTIONS, obj)
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

  {disableHypermedia} = clientOptions
  # set defaults
  disableHypermedia ?= false


  request = (method, path, data, options={raw:false, isBase64:false, isBoolean:false}, cb) ->
    # replacer = new Replacer(request)

    # Use a slightly convoluted syntax so browserify does not include the
    # NodeJS Buffer in the browser version.
    # data is a Buffer when uploading a release asset file
    if data and not global?['Buffer']?.isBuffer(data)
      data = uncamelizeObj(data)

    # For each request, convert the JSON into Objects
    _request = Request(clientOptions, ALL_PLUGINS)

    return _request method, path, data, options, (err, val) ->
      return cb(err) if err
      return cb(null, val) if options.raw

      unless disableHypermedia
        obj = parse(val, path, request)
        return cb(null, obj)
      else
        return cb(null, val)

  obj = {}
  Chainer(request, '', null, TREE_OPTIONS, obj)

  # Special case for `me`
  obj.me = obj.user

  obj.parse = (jsonObj) ->
    parse(jsonObj, '', request)

  obj.fromUrl = (path) ->
    ret = {}
    injectVerbMethods(request, path, ret)
    ret

  # Add the GitHub Status API https://status.github.com/api
  obj.status =     toPromise (cb) -> request('GET', 'https://status.github.com/api/status.json', null, null, cb)
  obj.status.api = toPromise (cb) -> request('GET', 'https://status.github.com/api.json', null, null, cb)
  obj.status.lastMessage = toPromise (cb) -> request('GET', 'https://status.github.com/api/last-message.json', null, null, cb)
  obj.status.messages = toPromise (cb) -> request('GET', 'https://status.github.com/api/messages.json', null, null, cb)

  return obj


module.exports = Octokat
