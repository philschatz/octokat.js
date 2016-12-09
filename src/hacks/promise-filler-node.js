// Webpack tries to include this package when building for node
// Therefore, we stub it out and then tell webpack to noParse this file
// so that it is properly require'd in the node build.
module.exports = require('es6-promise')
