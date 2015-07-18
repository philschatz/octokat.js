plus = require './plus'
{TREE_OPTIONS, OBJECT_MATCHER} = require './grammar'
Chainer = require './chainer'
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

Octokat = (clientOptions={}) ->

  # For each request, convert the JSON into Objects
  _request = Request(clientOptions)

  request = (method, path, data, options={raw:false, isBase64:false, isBoolean:false}, cb) ->
    replacer = new Replacer(request)

    # Use a slightly convoluted syntax so browserify does not include the
    # NodeJS Buffer in the browser version.
    # data is a Buffer when uploading a release asset file
    if data and not global?['Buffer']?.isBuffer(data)
      data = replacer.uncamelize(data)

    return _request method, path, data, options, (err, val) ->
      return cb(err) if err
      return cb(null, val) if options.raw

      obj = replacer.replace(val)
      url = obj.url or path
      reChainChildren(request, url, obj)
      return cb(null, obj)

  path = ''
  obj = {}
  Chainer(request, path, null, TREE_OPTIONS, obj)

  # Special case for `me`
  obj.me = obj.user

  obj.parse = (jsonObj) ->
    if jsonObj.url
      replacer = new Replacer(request)
      jsonObj = replacer.replace(jsonObj)
      Chainer(request, jsonObj.url, true, {}, jsonObj)
      reChainChildren(request, jsonObj.url, jsonObj)
    else
      Chainer(request, '', null, TREE_OPTIONS, jsonObj)
    jsonObj

  # Add the GitHub Status API https://status.github.com/api
  obj.status =     toPromise (cb) -> request('GET', 'https://status.github.com/api/status.json', null, null, cb)
  obj.status.api = toPromise (cb) -> request('GET', 'https://status.github.com/api.json', null, null, cb)
  obj.status.lastMessage = toPromise (cb) -> request('GET', 'https://status.github.com/api/last-message.json', null, null, cb)
  obj.status.messages = toPromise (cb) -> request('GET', 'https://status.github.com/api/messages.json', null, null, cb)

  return obj


module.exports = Octokat
