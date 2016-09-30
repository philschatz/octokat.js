// Converts a dictionary to a query string.
// Internal helper method
let toQueryString = function (options, omitQuestionMark) {
  // Returns '' if `options` is empty so this string can always be appended to a URL
  if (!options || options === {}) { return '' }

  let params = []
  let object = options || {}
  for (let key in object) {
    let value = object[key]
    if (value) { params.push(`${key}=${encodeURIComponent(value)}`) }
  }
  if (params.length) {
    if (omitQuestionMark) {
      return `&${params.join('&')}`
    } else {
      return `?${params.join('&')}`
    }
  } else {
    return ''
  }
}

module.exports = toQueryString
