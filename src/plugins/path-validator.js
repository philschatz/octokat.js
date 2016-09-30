const URL_VALIDATOR = require('../grammar/url-validator')

module.exports = new class PathValidator {
  requestMiddlewareAsync (input, cb) {
    let {path} = input
    if (!URL_VALIDATOR.test(path)) {
      let err = `Octokat BUG: Invalid Path. If this is actually a valid path then please update the URL_VALIDATOR. path=${path}`
      console.warn(err)
    }
    return cb(null, input)
  }
}()
