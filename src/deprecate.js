module.exports = function (message) {
  if (console && console.warn) {
    console.warn(`Octokat Deprecation: ${message}`)
  }
}
