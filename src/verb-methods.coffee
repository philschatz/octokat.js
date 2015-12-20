toQueryString = require './helpers/querystring'


toPromise = (orig, newPromise) ->
  return (args...) ->
    last = args[args.length - 1]
    if typeof last is 'function' # The last arg is a callback function
      args.pop()
      return orig(last, args...)
    else if newPromise
      return newPromise (resolve, reject) ->
        cb = (err, val) ->
          return reject(err) if err
          return resolve(val)
        orig(cb, args...)
    else
      throw new Error('You must specify a callback or have a promise library loaded')


injectVerbMethods = (plugins, request, path, obj) ->
  throw new Error('Octokat BUG: request is required') unless request

  # find the promise plugin (use the last one set)
  # TODO: Move these loops out so they are evaluated only once when the library is initialized
  for plugin in plugins
    if plugin.promiseCreator
      {newPromise, allPromises} = plugin.promiseCreator
      break

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
          return toPromise(makeRequest, newPromise)(args...)

    for verbName, verbFunc of plugin.asyncVerbs or {}
      do (verbName, verbFunc) ->
        obj.url = path # Mostly for testing
        obj[verbName] = (args...) ->
          makeRequest = verbFunc(request, path) # Curried function
          return toPromise(makeRequest, newPromise)(args...)

module.exports = injectVerbMethods
