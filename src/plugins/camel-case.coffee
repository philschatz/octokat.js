plus = require '../plus'

module.exports = new class CamelCase

  responseMiddleware: ({data}) ->
    data = @replace(data)
    {data}

  replace: (data) ->
    if Array.isArray(data)
      return @_replaceArray(data)
    else if typeof data is 'function'
      return data
    else if data == Object(data)
      return @_replaceObject(data)
    else
      return data

  _replaceObject: (orig) ->
    acc = {}
    for key in Object.keys(orig)
      value = orig[key]
      @_replaceKeyValue(acc, key, value)

    # # If the URL matches one of the "Object" types (repo, user, comment)
    # # then provide all of the same methods as `octo.repo(...)` would have on it
    # url = acc.url
    # Chainer(requestFn, url, true, null, acc) if url
    # for key in Object.keys(OBJECT_MATCHER)
    #   re = OBJECT_MATCHER[key]
    #   if re.test(url)
    #     context = TREE_OPTIONS
    #     for k in key.split('.')
    #       context = context[k]
    #     Chainer(requestFn, url, k, context, acc)
    #
    acc

  _replaceArray: (orig) ->
    arr = (@replace(item) for item in orig)
    # Convert the nextPage methods for paged results
    for key in Object.keys(orig)
      value = orig[key]
      @_replaceKeyValue(arr, key, value)
    arr

  # Convert things that end in `_url` to methods which return a Promise
  _replaceKeyValue: (acc, key, value) ->
    acc[plus.camelize(key)] = @replace(value)
