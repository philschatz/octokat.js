{toPromise} = require './helpers/promise'
toQueryString = require './helpers/querystring'

injectVerbMethods = (plugins, request, path, obj) ->
  throw new Error('Octokat BUG: request is required') unless request
  # Allow all the verb methods to accept a callback as the last arg
  # TODO: This part is really slow. It should be cached somehow (maybe using getters/setters?)
  for plugin in plugins
    for verbName, verbFunc of plugin.verbs or {}
      do (verbName, verbFunc) ->
        obj.url = path # Mostly for testing
        obj[verbName] = (args...) ->
          makeRequest =  (cb, originalArgs...) ->
            {method, path, data, options} = verbFunc(path, originalArgs...)
            request(method, path, data, options, cb)
          return toPromise(makeRequest)(args...)

    for verbName, verbFunc of plugin.asyncVerbs or {}
      do (verbName, verbFunc) ->
        obj.url = path # Mostly for testing
        obj[verbName] = (args...) ->
          makeRequest = verbFunc(request, path) # Curried function
          return toPromise(makeRequest)(args...)

module.exports = injectVerbMethods
