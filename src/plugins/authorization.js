const base64encode = require('../adapters/base64-node')

module.exports = new class Authorization {
  requestMiddlewareAsync (input) {
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
    return Promise.resolve(input)
  }
}()
