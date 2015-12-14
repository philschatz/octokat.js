{toPromise} = require './helper-promise'
toQueryString = require './helper-querystring'

injectVerbMethods = (plugins, request, path, obj) ->
  throw new Error('Octokat BUG: request is required') unless request
  # Allow all the verb methods to accept a callback as the last arg
  for plugin in plugins
    for verbName, verbFunc of plugin.verbs or {}
      do (verbName, verbFunc) ->
        obj.url = path # Mostly for testing
        obj[verbName] = (args...) ->
          makeRequest =  (cb, originalArgs...) ->
            {method, path, data, options} = verbFunc(path, originalArgs...)
            request(method, path, data, options, cb)
          return toPromise(makeRequest)(args...)

module.exports = injectVerbMethods
