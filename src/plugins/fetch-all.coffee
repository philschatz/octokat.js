toQueryString = require '../helpers/querystring'

pushAll = (target, source) ->
  unless Array.isArray(source)
    throw new Error('Octokat Error: Calling fetchAll on a request that does not yield an array');
  target.push.apply(target, source)

getMore = (fetchable, requester, acc, cb) ->
  doStuff = (err, results) ->
    return cb(err) if err
    pushAll(acc, results.items)
    getMore(results, requester, acc, cb)

  unless fetchNextPage(fetchable, requester, doStuff)
    cb(null, acc)

# TODO: HACK to handle camelCase and hypermedia plugins
fetchNextPage = (obj, requester, cb) ->
  if typeof obj.next_page_url is 'string'
    requester.request('GET', obj.next_page, null, null, cb)
    true
  else if obj.next_page
    obj.next_page.fetch(cb)
    true
  else if typeof obj.nextPageUrl is 'string'
    requester.request('GET', obj.nextPageUrl, null, null, cb)
    true
  else if obj.nextPage
    obj.nextPage.fetch(cb)
    true
  else
    false

module.exports = new class FetchAll
  asyncVerbs:
    fetchAll: (requester, path) -> (cb, query) ->
      # TODO: Pass in the instance so we can just call fromUrl maybe? and we don't rely on hypermedia to create nextPage
      requester.request 'GET', "#{path}#{toQueryString(query)}", null, null, (err, results) ->
        return cb(err) if err
        acc = []
        pushAll(acc, results.items)
        # TODO: handle `items.next_page = string/function`, `items.nextPage = string/function`
        getMore(results, requester, acc, cb)
