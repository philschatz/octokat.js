plus = require './plus'
{TREE_OPTIONS, OBJECT_MATCHER} = require './grammar'
Chainer = require './chainer'
injectVerbMethods = require './verb-methods'
Replacer = require './replacer'
Request = require './request'
{toPromise} = require './helper-promise'

# Combine all the classes into one client

reChainChildren = (request, url, obj) ->
  for key, re of OBJECT_MATCHER
    if re.test(obj.url)
      context = TREE_OPTIONS
      for k in key.split('.')
        context = context[k]
      Chainer(request, url, k, context, obj)
  obj


parse = (obj, path, request) ->
  url = obj.url or path
  if url
    replacer = new Replacer(request)
    obj = replacer.replace(obj)
    Chainer(request, url, true, {}, obj)
    reChainChildren(request, url, obj)
  else
    Chainer(request, '', null, TREE_OPTIONS, obj)
  obj


Octokat = (clientOptions={}) ->

  {disableHypermedia} = clientOptions
  # set defaults
  disableHypermedia ?= false


  request = (method, path, data, options={raw:false, isBase64:false, isBoolean:false}, cb) ->
    replacer = new Replacer(request)

    # Use a slightly convoluted syntax so browserify does not include the
    # NodeJS Buffer in the browser version.
    # data is a Buffer when uploading a release asset file
    if data and not global?['Buffer']?.isBuffer(data)
      data = replacer.uncamelize(data)

    # For each request, convert the JSON into Objects
    _request = Request(clientOptions)

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
