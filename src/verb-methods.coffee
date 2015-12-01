{URL_VALIDATOR} = require './grammar'
{toPromise} = require './helper-promise'
toQueryString = require './helper-querystring'

SIMPLE_VERBS_PLUGIN = require './plugin-simple-verbs'

# Test if the path is constructed correctly
URL_TESTER = (path) ->
  unless URL_VALIDATOR.test(path)
    err = "BUG: Invalid Path. If this is actually a valid path then please update the URL_VALIDATOR. path=#{path}"
    console.warn(err)


injectVerbMethods = (request, path, obj) ->
  # Allow all the verb methods to accept a callback as the last arg
  for verbName, verbFunc of SIMPLE_VERBS_PLUGIN.verbs
    do (verbName, verbFunc) ->
      obj[verbName] = (args...) ->
        URL_TESTER(path)
        makeRequest =  (cb, originalArgs...) ->
          {method, path, data, options} = verbFunc(path, originalArgs...)
          request(method, path, data, options, cb)
        return toPromise(makeRequest)(args...)

module.exports = injectVerbMethods
