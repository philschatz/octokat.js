{DEFAULT_HEADER} = require '../grammar'

# Use the preview API header if one of the routes match the preview APIs
module.exports =
  requestMiddleware: ({path}) ->
    acceptHeader = DEFAULT_HEADER(path)
    if acceptHeader
      {headers: {'Accept': acceptHeader}}
