if (typeof btoa !== 'undefined') {
  // For browsers use the native btoa
  module.exports = require('./base64-browser')
} else if (typeof process !== 'undefined') {
  // For node use HTTP adapter
  module.exports = require('./base64-node')
} else {
  throw new Error('Could not find base64 encode function')
}
