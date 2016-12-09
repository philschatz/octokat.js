const PREVIEW_HEADERS = require('../grammar/preview-headers')

let DEFAULT_HEADER = function (url) {
  for (let key in PREVIEW_HEADERS) {
    let val = PREVIEW_HEADERS[key]
    if (val.test(url)) { return key }
  }
}

// Use the preview API header if one of the routes match the preview APIs
module.exports = new class PreviewApis {
  requestMiddlewareAsync (input, cb) {
    let {path} = input
    let acceptHeader = DEFAULT_HEADER(path)
    if (acceptHeader) {
      input.headers['Accept'] = acceptHeader
    }

    return cb(null, input)
  }
}()
