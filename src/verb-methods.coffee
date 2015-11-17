{URL_VALIDATOR} = require './grammar'
{toPromise} = require './helper-promise'
toQueryString = require './helper-querystring'

# Test if the path is constructed correctly
URL_TESTER = (path) ->
  unless URL_VALIDATOR.test(path)
    err = "BUG: Invalid Path. If this is actually a valid path then please update the URL_VALIDATOR. path=#{path}"
    console.warn(err)


injectVerbMethods = (request, path, obj) ->
  verbs =
    fetch      : (cb, config) ->   request('GET', "#{path}#{toQueryString(config)}", null, {}, cb)
    read       : (cb, config) ->   request('GET', "#{path}#{toQueryString(config)}", null, {raw:true}, cb)
    readBinary : (cb, config) ->   request('GET', "#{path}#{toQueryString(config)}", null, {raw:true, isBase64:true}, cb)
    remove     : (cb, config) ->   request('DELETE', path, config, {isBoolean:true}, cb)
    create     : (cb, config, isRaw) -> request('POST', path, config, {raw:isRaw}, cb)
    update     : (cb, config) ->   request('PATCH', path, config, null, cb)
    add        : (cb, config) ->   request('PUT', path, config, {isBoolean:true}, cb)
    contains   : (cb, args...) ->  request('GET', "#{path}/#{args.join('/')}", null, {isBoolean:true}, cb)

  # Allow all the verb methods to accept a callback as the last arg
  for verbName, verbFunc of verbs
    # For development, validate the URL
    do (verbName, verbFunc) ->
      obj[verbName] = (args...) ->
        URL_TESTER(path)
        return toPromise(verbFunc)(args...)
    # For production do not validate the URL
    # obj[verbName] = toPromise(verbFunc)


module.exports = injectVerbMethods
