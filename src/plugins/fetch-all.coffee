pushAll = (target, source) ->
  target.push.apply(target, source)

getMore = (fetchable, requestFn, acc, cb) ->
  doStuff = (err, items) ->
    return cb(err) if err
    pushAll(acc, items)
    getMore(items, requestFn, acc, cb)

  unless fetchNextPage(fetchable, requestFn, doStuff)
    cb(null, acc)

# TODO: HACK to handle camelCase and hypermedia plugins
fetchNextPage = (obj, requestFn, cb) ->
  if typeof obj.next_page is 'string'
    requestFn('GET', obj.next_page, null, null, cb)
    true
  else if obj.next_page
    obj.next_page.fetch(cb)
    true
  else if typeof obj.nextPage is 'string'
    requestFn('GET', obj.nextPage, null, null, cb)
    true
  else if obj.nextPage
    obj.nextPage.fetch(cb)
    true
  else
    false

module.exports =
  asyncVerbs:
    fetchAll: (requestFn, path) -> (cb, query) ->
      # TODO: Pass in the instance so we can just call fromUrl maybe? and we don't rely on hypermedia to create nextPage
      requestFn 'GET', path, query, null, (err, items) ->
        return cb(err) if err
        acc = []
        pushAll(acc, items)
        # TODO: handle `items.next_page = string/function`, `items.nextPage = string/function`
        getMore(items, requestFn, acc, cb)
