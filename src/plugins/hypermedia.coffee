deprecate = require '../deprecate'

module.exports = new class HyperMedia
  replace: (instance, data) ->
    if Array.isArray(data)
      return @_replaceArray(instance, data)
    else if typeof data is 'function'
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

      # fn = (cb, args...) =>
      #   # Deprecate calling this function when the URL does not contain
      #   # any template args.
      #   unless /\{/.test(value) or /_page_url$/.test(key)
      #     console.warn('Deprecation warning: Use the .fooUrl field instead of calling the method')
      #
      #   # # url can contain {name} or {/name} in the URL.
      #   # # for every arg passed in, replace {...} with that arg
      #   # # and remove the rest (they may or may not be optional)
      #   # url = value
      #   # i = 0
      #   # while m = /(\{[^\}]+\})/.exec(url)
      #   #   # `match` is something like `{/foo}`
      #   #   match = m[1]
      #   #   if i < args.length
      #   #     # replace it
      #   #     param = args[i]
      #   #     switch match[1]
      #   #       when '/'
      #   #         param = "/#{param}"
      #   #       when '?'
      #   #         # Strip off the "{?" and the trailing "}"
      #   #         # For example, the URL is `/assets{?name,label}`
      #   #         #   which turns into `/assets?name=foo.zip`
      #   #         # Used to upload releases via the repo releases API.
      #   #         # TODO: When match contains `,` or
      #   #         # `args.length is 1` and args[0] is object match the args to those in the template
      #   #         optionalNames = match[2..-2].split(',')
      #   #         # If param is a string then just use the 1st optionalName
      #   #         if typeof param is 'object'
      #   #           # TODO: validate the optionalNames
      #   #           if Object.keys(param).length is 0
      #   #             console.warn('Must pass in a dictionary with at least one key when there are multiple optional params')
      #   #           for paramName in Object.keys(param)
      #   #             if optionalNames.indexOf(paramName) < 0
      #   #               console.warn("Invalid parameter '#{paramName}' passed in as argument")
      #   #           param = toQueryString(param)
      #   #         else
      #   #           param = "?#{optionalNames[0]}=#{param}"
      #   #
      #   #   else
      #   #     # Discard the remaining optional params in the URL
      #   #     param = ''
      #   #     if match[1] isnt '/'
      #   #       throw new Error("BUG: Missing required parameter #{match}")
      #   #   url = url.replace(match, param)
      #   #   i++
      #
      #   if /upload_url$/.test(key)
      #     # POST https://<upload_url>/repos/:owner/:repo/releases/:id/assets?name=foo.zip
      #     # Pull off the last 2 args to .upload()
      #     url = applyHypermedia(value, args...)
      #     [contentType, data]     = args[-2..]
      #     requestFn('POST', url, data, {contentType, raw:true}, cb)
      #   else
      #     # TODO: Don't do the extra curry here. pull it out and make fn = instance.fromUrl
      #     instance.fromUrl(value, args...)(cb)
      #     # url = applyHypermedia(value, args...)
      #     # requestFn('GET', url, null, null, cb) # TODO: Heuristically set the isBoolean flag

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

      # fn = toPromise(fn)
      # fn.url = value
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
