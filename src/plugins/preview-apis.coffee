PREVIEW_HEADERS = require '../grammar/preview-headers'

DEFAULT_HEADER = (url) ->
  for key, val of PREVIEW_HEADERS
    return key if val.test(url)
  # return 'application/vnd.github.v3+json'

# Use the preview API header if one of the routes match the preview APIs
module.exports =
  requestMiddleware: ({path}) ->
    acceptHeader = DEFAULT_HEADER(path)
    if acceptHeader
      {headers: {'Accept': acceptHeader}}
