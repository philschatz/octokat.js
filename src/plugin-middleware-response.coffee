plus = require './plus'
deprecate = require './deprecate'
{toPromise} = require './helper-promise'
applyHypermedia = require './helper-hypermedia'
{TREE_OPTIONS, OBJECT_MATCHER} = require './grammar'
# Chainer = require './chainer'

# JSON Replacer
# ===============================
#
# - Sprinkles methods into the JSON returned from GitHub.
#   - URL templates are converted to methods (like `compare_url`)
#   - If the JSON matches something in OBJECT_MATCHER then additional methods
#     are sprinkled in.
# - Converts keys to `camelCase`

CAMEL_CASE = new class CamelCase

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


PAGED_RESULTS = new class PagedResults
  responseMiddleware: ({jqXHR, data}) ->
    return unless jqXHR # The plugins are all used in `octo.parse()` which does not have a jqXHR

    # Only JSON responses have next/prev/first/last link headers
    # Add them to data so the resolved value is iterable

    if Array.isArray(data)
      data = data[...]

      # Parse the Link headers
      # of the form `<http://a.com>; rel="next", <https://b.com?a=b&c=d>; rel="previous"`
      links = jqXHR.getResponseHeader('Link')
      for part in links?.split(',') or []
        [discard, href, rel] = part.match(/<([^>]+)>;\ rel="([^"]+)"/)
        # Add the pagination functions on the JSON since Promises resolve one value
        # Name the functions `nextPage`, `previousPage`, `firstPage`, `lastPage`
        data["#{rel}_page_url"] = href

      {data}


HYPERMEDIA = new class HyperMedia
  replace: (instance, requestFn, data) ->
    if Array.isArray(data)
      return @_replaceArray(instance, requestFn, data)
    else if typeof data is 'function'
      return data
    else if data == Object(data)
      return @_replaceObject(instance, requestFn, data)
    else
      return data

  _replaceObject: (instance, requestFn, orig) ->
    acc = {}
    for key in Object.keys(orig)
      value = orig[key]
      @_replaceKeyValue(instance, requestFn, acc, key, value)

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

  _replaceArray: (instance, requestFn, orig) ->
    arr = (@replace(instance, requestFn, item) for item in orig)
    # Convert the nextPage methods for paged results
    for key in Object.keys(orig)
      value = orig[key]
      @_replaceKeyValue(instance, requestFn, arr, key, value)
    arr

  # Convert things that end in `_url` to methods which return a Promise
  _replaceKeyValue: (instance, requestFn, acc, key, value) ->
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
      acc[key] = @replace(instance, requestFn, value)

  responseMiddleware: ({instance, requestFn, data}) ->
    data = @replace(instance, requestFn, data)
    {data}


READ_BINARY = new class ReadBinary
  requestMiddleware: ({options}) ->
    {isBase64} = options
    if isBase64
      return {
        headers: {Accept: 'application/vnd.github.raw'}
        mimeType: 'text/plain; charset=x-user-defined'
      }

  responseMiddleware: ({options, data}) ->
    {isBase64} = options
    # Convert the response to a Base64 encoded string
    if isBase64
      # Convert raw data to binary chopping off the higher-order bytes in each char.
      # Useful for Base64 encoding.
      converted = ''
      for i in [0...data.length]
        converted += String.fromCharCode(data.charCodeAt(i) & 0xff)

      {data:converted}


module.exports = {CAMEL_CASE, PAGED_RESULTS, HYPERMEDIA, READ_BINARY}
