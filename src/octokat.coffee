deprecate = require './deprecate'
OctokatBase = require './base'

HypermediaPlugin = require './plugins/hypermedia'

ALL_PLUGINS = [
  require './plugins/promise/library-first'
  require './plugins/path-check'
  require './plugins/authorization'
  require './plugins/preview-apis'
  require './plugins/use-post-instead-of-patch'

  require './plugins/simple-verbs'
  require './plugins/fetch-all'

  require './plugins/read-binary'
  require './plugins/pagination'
  # Run cacheHandler after PagedResults so the link headers are remembered
  # but before hypermedia so the object is still serializable
  require './plugins/cache-handler'

  HypermediaPlugin
  require './plugins/camel-case'
]


Octokat = (clientOptions={}) ->

  clientOptions.plugins ?= ALL_PLUGINS

  if clientOptions.disableHypermedia
    deprecate('Please use the clientOptions.plugins array and just do not include the hypermedia plugin')
    clientOptions.plugins = clientOptions.plugins.filter (plugin) ->
      plugin isnt HypermediaPlugin

  # the octokat instance
  instance = new OctokatBase(clientOptions)
  return instance

module.exports = Octokat
