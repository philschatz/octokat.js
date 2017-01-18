const base64encode = require('../adapters/base64')

module.exports = new class Authorization {
  requestMiddlewareAsync (input, cb) {
    if (input.headers == null) { input.headers = {} }
    let {headers, clientOptions: {token, username, password}} = input
    if (token || (username && password)) {
      if (token) {
        var auth = `token ${token}`
      } else {
        var auth = `Basic ${base64encode(`${username}:${password}`)}`
      }
      input.headers['Authorization'] = auth
    }
    return cb(null, input)
  }
}()
