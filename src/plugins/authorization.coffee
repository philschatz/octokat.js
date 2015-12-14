base64encode = require '../helper-base64'

module.exports =
  requestMiddleware: ({clientOptions:{token, username, password}}) ->
    if token or (username and password)
      if token
        auth = "token #{token}"
      else
        auth = 'Basic ' + base64encode("#{username}:#{password}")
      {headers: {'Authorization': auth}}
