plus = require './plus'
{toPromise} = require './helper-promise'
toQueryString = require './helper-querystring'
{TREE_OPTIONS, OBJECT_MATCHER} = require './grammar'
Chainer = require './chainer'

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
    # Chainer(@_request, url, true, null, acc) if url
    # for key in Object.keys(OBJECT_MATCHER)
    #   re = OBJECT_MATCHER[key]
    #   if re.test(url)
    #     context = TREE_OPTIONS
    #     for k in key.split('.')
    #       context = context[k]
    #     Chainer(@_request, url, k, context, acc)
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
module.exports = {CAMEL_CASE, PAGED_RESULTS}
