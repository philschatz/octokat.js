const toQueryString = require('../helpers/querystring')

let pushAll = function (target, source) {
  if (!Array.isArray(source)) {
    throw new Error('Octokat Error: Calling fetchAll on a request that does not yield an array')
  }
  return target.push.apply(target, source)
}

let getMore = function (fetchable, requester, acc, cb) {
  let doStuff = function (err, results) {
    if (err) { return cb(err) }
    pushAll(acc, results.items)
    return getMore(results, requester, acc, cb)
  }

  if (!fetchNextPage(fetchable, requester, doStuff)) {
    return cb(null, acc)
  }
}

// TODO: HACK to handle camelCase and hypermedia plugins
var fetchNextPage = function (obj, requester, cb) {
  if (typeof obj.next_page_url === 'string') {
    requester.request('GET', obj.next_page, null, null, cb)
    return true
  } else if (obj.next_page) {
    obj.next_page.fetch(cb)
    return true
  } else if (typeof obj.nextPageUrl === 'string') {
    requester.request('GET', obj.nextPageUrl, null, null, cb)
    return true
  } else if (obj.nextPage) {
    obj.nextPage.fetch(cb)
    return true
  } else {
    return false
  }
}

// new class FetchAll
module.exports = {
  asyncVerbs: {
    fetchAll (requester, path) { return (cb, query) =>
      // TODO: Pass in the instance so we can just call fromUrl maybe? and we don't rely on hypermedia to create nextPage
      requester.request('GET', `${path}${toQueryString(query)}`, null, null, function (err, results) {
        if (err) { return cb(err) }
        let acc = []
        pushAll(acc, results.items)
        // TODO: handle `items.next_page = string/function`, `items.nextPage = string/function`
        return getMore(results, requester, acc, cb)
      }
      )
    }
  }
}
