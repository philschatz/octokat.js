base64encode = require '../helpers/base64'

module.exports = new class Authorization
  requestMiddlewareAsync: (input, cb) ->
    input.headers ?= {}
    {headers, clientOptions:{token, username, password}} = input
    if token or (username and password)
      if token
        auth = "token #{token}"
      else
        auth = 'Basic ' + base64encode("#{username}:#{password}")
      input.headers['Authorization'] = auth
    return cb(null, input)
