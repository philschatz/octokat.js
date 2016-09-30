const toQueryString = require('../helpers/querystring')

// new class SimpleVerbs
module.exports = {
  verbs: {
    fetch (path, query) { return {method: 'GET', path: `${path}${toQueryString(query)}`} },
    read (path, query) { return {method: 'GET', path: `${path}${toQueryString(query)}`, options: {isRaw: true}} },
    remove (path, data) { return {method: 'DELETE', path, data, options: {isBoolean: true}} },
    create (path, data, contentType) {
      if (contentType) {
        return {method: 'POST', path, data, options: {isRaw: true, contentType}}
      } else {
        return {method: 'POST', path, data}
      }
    },
    update (path, data) { return {method: 'PATCH', path, data} },
    add (path, data) { return {method: 'PUT', path, data, options: {isBoolean: true}} },
    contains (path, ...args) { return {method: 'GET', path: `${path}/${args.join('/')}`, options: {isBoolean: true}} }
  }
}
