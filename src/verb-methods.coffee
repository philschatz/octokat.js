{URL_VALIDATOR} = require './grammar'
{toPromise} = require './helper-promise'
toQueryString = require './helper-querystring'

# Test if the path is constructed correctly
URL_TESTER = (path) ->
  unless URL_VALIDATOR.test(path)
    err = "Octokat BUG: Invalid Path. If this is actually a valid path then please update the URL_VALIDATOR. path=#{path}"
    console.warn(err)


injectVerbMethods = (plugins, request, path, obj) ->
  throw new Error('Octokat BUG: request is required') unless request
  # Allow all the verb methods to accept a callback as the last arg
  for plugin in plugins
    for verbName, verbFunc of plugin.verbs or {}
      do (verbName, verbFunc) ->
        obj.url = path # Mostly for testing
        obj[verbName] = (args...) ->
          URL_TESTER(path)
          makeRequest =  (cb, originalArgs...) ->
            {method, path, data, options} = verbFunc(path, originalArgs...)
            request(method, path, data, options, cb)
          return toPromise(makeRequest)(args...)

module.exports = injectVerbMethods
