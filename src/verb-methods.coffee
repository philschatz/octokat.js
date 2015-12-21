filter = require 'lodash/collection/filter'
forOwn = require 'lodash/object/forOwn'
extend = require 'lodash/object/extend'
toQueryString = require './helpers/querystring'

# When `origFn` is not passed a callback as the last argument then return a
# Promise, or error if no Promise can be found (see `plugins/promise/*` for
# some strategies for loading a Promise implementation)
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


module.exports = class VerbMethods
  constructor: (plugins, @_requester) ->
    throw new Error('Octokat BUG: request is required') unless @_requester

    promisePlugins = filter plugins, ({promiseCreator}) -> promiseCreator
    if promisePlugins
      @_promisePlugin = promisePlugins[0]

    @_syncVerbs = {}
    for plugin in filter(plugins, ({verbs}) -> verbs)
      extend @_syncVerbs, plugin.verbs
    @_asyncVerbs = {}
    for plugin in filter(plugins, ({asyncVerbs}) -> asyncVerbs)
      extend @_asyncVerbs, plugin.asyncVerbs

  # Injects verb methods onto `obj`
  injectVerbMethods: (path, obj) ->
    if @_promisePlugin
      {newPromise, allPromises} = @_promisePlugin.promiseCreator

    obj.url = path # Mostly for testing
    forOwn @_syncVerbs, (verbFunc, verbName) =>
      obj[verbName] = (args...) =>
        makeRequest =  (cb, originalArgs...) =>
          {method, path, data, options} = verbFunc(path, originalArgs...)
          @_requester.request(method, path, data, options, cb)
        return toPromise(makeRequest, newPromise)(args...)

    forOwn @_asyncVerbs, (verbFunc, verbName) =>
      obj[verbName] = (args...) =>
        makeRequest = verbFunc(@_requester, path) # Curried function
        return toPromise(makeRequest, newPromise)(args...)
