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
    else if data instanceof Date
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
