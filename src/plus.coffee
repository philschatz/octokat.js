# require('underscore-plus')
plus =
  camelize: (string) ->
    if string
      string.replace /[_-]+(\w)/g, (m) -> m[1].toUpperCase()
    else
      ''

  uncamelize: (string) ->
    return '' unless string
    return string.replace /([A-Z])+/g, (match, letter='') -> "_#{letter.toLowerCase()}"

  dasherize: (string) ->
    return '' unless string

    string = string[0].toLowerCase() + string[1..]
    string.replace /([A-Z])|(_)/g, (m, letter) ->
      if letter
        '-' + letter.toLowerCase()
      else
        '-'

  # Just _.extend(target, source)
  extend: (target, source) ->
    if source
      for key in Object.keys(source)
        target[key] = source[key]

module.exports = plus
