{URL_VALIDATOR, DEFAULT_HEADER} = require './grammar'
base64encode = require './helper-base64'

PATH_TEST =
  requestMiddleware: ({path}) ->
    unless URL_VALIDATOR.test(path)
      err = "Octokat BUG: Invalid Path. If this is actually a valid path then please update the URL_VALIDATOR. path=#{path}"
      console.warn(err)

USE_POST_INSTEAD_OF_PATCH =
  requestMiddleware: ({clientOptions:{usePostInsteadOfPatch}, method}) ->
    if usePostInsteadOfPatch and method is 'PATCH'
      {method: 'POST'}

# Use the preview API header if one of the routes match the preview APIs
PREVIEW_APIS =
  requestMiddleware: ({path}) ->
    acceptHeader = DEFAULT_HEADER(path)
    if acceptHeader
      {headers: {'Accept': acceptHeader}}

AUTHORIZATION =
  requestMiddleware: ({clientOptions:{token, username, password}}) ->
    if token or (username and password)
      if token
        auth = "token #{token}"
      else
        auth = 'Basic ' + base64encode("#{username}:#{password}")
      {headers: {'Authorization': auth}}


module.exports = [
  # PATH_TEST
  USE_POST_INSTEAD_OF_PATCH
  PREVIEW_APIS
  AUTHORIZATION
]
