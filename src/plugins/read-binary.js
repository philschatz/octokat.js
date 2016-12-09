const toQueryString = require('../helpers/querystring')

module.exports = new class ReadBinary {
  constructor () {
    this.verbs =
      {readBinary (path, query) { return {method: 'GET', path: `${path}${toQueryString(query)}`, options: {isRaw: true, isBase64: true}} }}
  }

  requestMiddlewareAsync (input, cb) {
    let {options} = input
    if (options) {
      let {isBase64} = options
      if (isBase64) {
        input.headers['Accept'] = 'application/vnd.github.raw'
        input.mimeType = 'text/plain; charset=x-user-defined'
      }
    }
    return cb(null, input)
  }

  responseMiddlewareAsync (input, cb) {
    let {options, data} = input
    if (options) {
      let {isBase64} = options
      // Convert the response to a Base64 encoded string
      if (isBase64) {
        // Convert raw data to binary chopping off the higher-order bytes in each char.
        // Useful for Base64 encoding.
        let converted = ''
        let iterable = __range__(0, data.length, false)
        for (let j = 0; j < iterable.length; j++) {
          let i = iterable[j]
          converted += String.fromCharCode(data.charCodeAt(i) & 0xff)
        }

        input.data = converted // or throw new Error('BUG! Expected JSON data to exist')
      }
    }
    return cb(null, input)
  }
}()

function __range__ (left, right, inclusive) {
  let range = []
  let ascending = left < right
  let end = !inclusive ? right : ascending ? right + 1 : right - 1
  for (let i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
    range.push(i)
  }
  return range
}
