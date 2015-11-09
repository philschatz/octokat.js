# Converts a dictionary to a query string.
# Internal helper method
toQueryString = (options) ->

  # Returns '' if `options` is empty so this string can always be appended to a URL
  return '' if not options or options is {}

  params = []
  for key, value of options or {}
    params.push "#{key}=#{encodeURIComponent(value)}"
  return "?#{params.join('&')}"

module.exports = toQueryString
