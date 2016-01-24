deprecate = require '../deprecate'

module.exports = new class HyperMedia
  replace: (instance, data) ->
    if Array.isArray(data)
      return @_replaceArray(instance, data)
    else if typeof data is 'function'
      return data
    else if data instanceof Date
      return data
    else if data == Object(data)
      return @_replaceObject(instance, data)
    else
      return data

  _replaceObject: (instance, orig) ->
    acc = {}
    for key in Object.keys(orig)
      value = orig[key]
      @_replaceKeyValue(instance, acc, key, value)

    acc

  _replaceArray: (instance, orig) ->
    arr = (@replace(instance, item) for item in orig)
    # Convert the nextPage methods for paged results
    for key in Object.keys(orig)
      value = orig[key]
      @_replaceKeyValue(instance, arr, key, value)
    arr

  # Convert things that end in `_url` to methods which return a Promise
  _replaceKeyValue: (instance, acc, key, value) ->
    if /_url$/.test(key)

      if /^upload_url$/.test(key)
        # POST https://<upload_url>/repos/:owner/:repo/releases/:id/assets?name=foo.zip
        # Pull off the last 2 args to .upload()
        defaultFn = (args...) ->
          # TODO: Maybe always set isRaw=true when contentType is prvided
          deprecate('call .upload({name, label}).create(data, contentType)' +
            ' instead of .upload(name, data, contentType)')
          defaultFn.create(args...)

        fn = (args...) ->
          instance._fromUrlWithDefault(value, defaultFn, args...)()
      else
        defaultFn = ->
          deprecate('instead of directly calling methods like .nextPage(), use .nextPage.fetch()')
          @fetch()
        fn = instance._fromUrlCurried(value, defaultFn)

      newKey = key.substring(0, key.length-'_url'.length)
      acc[newKey] = fn
      # add a camelCase URL field for retrieving non-templated URLs
      # like `avatarUrl` and `htmlUrl`
      unless /\{/.test(value)
        acc[key] = value

    else if /_at$/.test(key)
      # Ignore null dates so we do not get `Wed Dec 31 1969`
      acc[key] = if value then new Date(value) else null

    else
      acc[key] = @replace(instance, value)

  responseMiddleware: ({instance, data}) ->
    data = @replace(instance, data)
    {data}
