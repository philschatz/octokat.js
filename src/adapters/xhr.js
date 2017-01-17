let XHR
if (typeof XMLHttpRequest !== 'undefined') {
  // For browsers use XHR adapter
  XHR = require('./xhr-browser')
} else if (typeof process !== 'undefined') {
  // For node use HTTP adapter
  XHR = require('./xhr-node')
} else {
  throw new Error('Could not find XMLHttpRequest')
}

module.exports = XHR
