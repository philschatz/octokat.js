const toQueryString = require('./querystring')
const deprecate = require('../deprecate')

module.exports = function (url, ...args) {
  // Deprecated interface. Use an Object to specify the args in the template.
  // the order of fields in the template should not matter.
  let m
  if (args.length === 0) {
    var templateParams = {}
  } else {
    if (args.length > 1) {
      deprecate('When filling in a template URL pass all the field to fill in 1 object instead of comma-separated args')
    }

    var templateParams = args[0]
  }

  // url can contain {name} or {/name} in the URL.
  // for every arg passed in, replace {...} with that arg
  // and remove the rest (they may or may not be optional)
  let i = 0
  while (m = /(\{[^\}]+\})/.exec(url)) {
    // `match` is something like `{/foo}` or `{?foo,bar}` or `{foo}` (last one means it is required)
    let match = m[1]
    let param = ''
    // replace it
    switch (match[1]) {
      case '/':
        let fieldName = match.slice(2, match.length - 1) // omit the braces and the slash
        let fieldValue = templateParams[fieldName]
        if (fieldValue) {
          if (/\//.test(fieldValue)) {
            throw new Error(`Octokat Error: this field must not contain slashes: ${fieldName}`)
          }
          param = `/${fieldValue}`
        }
        break
      case '+':
        fieldName = match.slice(2, match.length - 1) // omit the braces and the `+`
        fieldValue = templateParams[fieldName]
        if (fieldValue) {
          param = fieldValue
        }
        break
      case '?':
        // Strip off the "{?" and the trailing "}"
        // For example, the URL is `/assets{?name,label}`
        //   which turns into `/assets?name=foo.zip`
        // Used to upload releases via the repo releases API.
        //
        // When match contains `,` or
        // `args.length is 1` and args[0] is object match the args to those in the template
        let optionalNames = match.slice(2, -2 + 1).split(',') // omit the braces and the `?` before splitting
        let optionalParams = {}
        for (let j = 0; j < optionalNames.length; j++) {
          fieldName = optionalNames[j]
          optionalParams[fieldName] = templateParams[fieldName]
        }
        param = toQueryString(optionalParams)
        break
      case '&':
        optionalNames = match.slice(2, -2 + 1).split(',') // omit the braces and the `?` before splitting
        optionalParams = {}
        for (let k = 0; k < optionalNames.length; k++) {
          fieldName = optionalNames[k]
          optionalParams[fieldName] = templateParams[fieldName]
        }
        param = toQueryString(optionalParams, true) // true means omitQuestionMark
        break

      default:
        // This is a required field. ie `{repoName}`
        fieldName = match.slice(1, match.length - 1) // omit the braces
        if (templateParams[fieldName]) {
          param = templateParams[fieldName]
        } else {
          throw new Error(`Octokat Error: Required parameter is missing: ${fieldName}`)
        }
    }

    url = url.replace(match, param)
    i++
  }

  return url
}
