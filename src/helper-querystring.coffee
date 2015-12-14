# Converts a dictionary to a query string.
# Internal helper method
toQueryString = (options, omitQuestionMark) ->

  # Returns '' if `options` is empty so this string can always be appended to a URL
  return '' if not options or options is {}

  params = []
  for key, value of options or {}
    params.push "#{key}=#{encodeURIComponent(value)}" if value
  if params.length
    if omitQuestionMark
      return "&#{params.join('&')}"
    else
      return "?#{params.join('&')}"
  else
    return ''

module.exports = toQueryString
