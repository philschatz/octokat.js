const deprecate = require('./deprecate')
const OctokatBase = require('./base')

const HypermediaPlugin = require('./plugins/hypermedia')

let ALL_PLUGINS = [
  require('./plugins/object-chainer'), // re-chain methods when we detect an object (issue, comment, user, etc)
  require('./plugins/path-validator'),
  require('./plugins/authorization'),
  require('./plugins/preview-apis'),
  require('./plugins/use-post-instead-of-patch'),

  require('./plugins/simple-verbs'),
  require('./plugins/fetch-all'),

  require('./plugins/read-binary'),
  require('./plugins/pagination'),
  // Run cacheHandler after PagedResults so the link headers are remembered
  // but before hypermedia so the object is still serializable
  require('./plugins/cache-handler'),

  HypermediaPlugin,
  require('./plugins/camel-case')
]

let Octokat = function (clientOptions = {}) {
  if (clientOptions.plugins == null) { clientOptions.plugins = ALL_PLUGINS }

  if (clientOptions.disableHypermedia) {
    deprecate('Please use the clientOptions.plugins array and just do not include the hypermedia plugin')
    clientOptions.plugins = clientOptions.plugins.filter(plugin => plugin !== HypermediaPlugin)
  }

  // the octokat instance
  let instance = new OctokatBase(clientOptions)
  return instance
}

// module.exports = Octokat;
module.exports = Octokat
