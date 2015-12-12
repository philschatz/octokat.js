module.exports = new class CacheMiddleware
  constructor: ->
    @_cachedETags = {}

  # Default cacheHandler methods
  get: (method, path) ->
    @_cachedETags["#{method} #{path}"]

  add: (method, path, eTag, data, status) ->
    @_cachedETags["#{method} #{path}"] = {eTag, data, status}

  requestMiddleware: ({clientOptions, method, path}) ->
    headers = {}
    cacheHandler = clientOptions.cacheHandler or @
    # Send the ETag if re-requesting a URL
    if cacheHandler.get(method, path)
      headers['If-None-Match'] = cacheHandler.get(method, path).eTag
    else
      # The browser will sneak in a 'If-Modified-Since' header if the GET has been requested before
      # but for some reason the cached response does not seem to be available
      # in the jqXHR object.
      # So, the first time a URL is requested set this date to 0 so we always get a response the 1st time
      # a URL is requested.
      headers['If-Modified-Since'] = 'Thu, 01 Jan 1970 00:00:00 GMT'

    {headers}


  responseMiddleware: ({clientOptions, request:{method, path}, status, jqXHR, data}) ->
    cacheHandler = clientOptions.cacheHandler or @
    if status is 304
      {data, status} = cacheHandler.get(method, path)
    else
      # Cache the response to reuse later
      if method is 'GET' and jqXHR.getResponseHeader('ETag') # TODO: and clientOptions.useETags
        eTag = jqXHR.getResponseHeader('ETag')
        cacheHandler.add(method, path, eTag, data, jqXHR.status)

    {data, status}
