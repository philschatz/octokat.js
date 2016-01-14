base64encode = require './helper-base64'
{DEFAULT_HEADER} = require './grammar'

# Request Function
# ===============================
#
# Generates the actual HTTP requests to GitHub.
# Handles ETag caching, authentication headers, boolean requests, and paged results

userAgent = 'octokat.js' unless window?

# Simple jQuery.ajax() shim that returns a promise for a xhr object
ajax = (options, cb) ->

  # Use the browser XMLHttpRequest if it exists. If not, then this is NodeJS
  # Pull this in for every request so sepia.js has a chance to override `window.XMLHTTPRequest`
  if window?
    XMLHttpRequest = window.XMLHttpRequest
  else
    req = require
    XMLHttpRequest = req('xmlhttprequest').XMLHttpRequest


  xhr = new XMLHttpRequest()
  xhr.dataType = options.dataType
  xhr.overrideMimeType?(options.mimeType)
  xhr.open(options.type, options.url)

  if options.data and options.type isnt 'GET'
    xhr.setRequestHeader('Content-Type', options.contentType)

  for name, value of options.headers
    xhr.setRequestHeader(name, value)

  xhr.onreadystatechange = () ->
    if 4 == xhr.readyState
      options.statusCode?[xhr.status]?()

      if xhr.status >= 200 and xhr.status < 300 or xhr.status is 304 or xhr.status is 302
        cb(null, xhr)
      else
        cb(xhr)
  xhr.send(options.data)


# Class for caching ETag responses
class ETagResponse
  constructor: (@eTag, @data, @status) ->


# # Construct the request function.
# It contains all the auth credentials passed in to the client constructor

Request = (clientOptions={}) ->

  # Provide an option to override the default URL
  clientOptions.rootURL ?= 'https://api.github.com'
  clientOptions.useETags ?= true
  clientOptions.usePostInsteadOfPatch ?= false

  # These are updated whenever a request is made (optional)
  emitter = clientOptions.emitter

  # Cached responses are stored in this object keyed by `path`
  _cachedETags = {}

  cacheHandler = clientOptions.cacheHandler or {
    get: (method, path) ->
      _cachedETags["#{method} #{path}"]
    add: (method, path, eTag, data, status) ->
      _cachedETags["#{method} #{path}"] = new ETagResponse(eTag, data, status)
  }

  # HTTP Request Abstraction
  # =======
  #
  return (method, path, data, options={raw:false, isBase64:false, isBoolean:false, contentType:'application/json'}, cb) ->

    options             ?= {}
    options.raw         ?= false
    options.isBase64    ?= false
    options.isBoolean   ?= false
    options.contentType ?= 'application/json'

    # console.log method, path, data, options, typeof cb

    if method is 'PATCH' and clientOptions.usePostInsteadOfPatch
      method = 'POST'

    # Only prefix the path when it does not begin with http.
    # This is so pagination works (which provides absolute URLs).
    path = "#{clientOptions.rootURL}#{path}" if not /^http/.test(path)

    # Support binary data by overriding the response mimeType
    mimeType = undefined
    mimeType = 'text/plain; charset=x-user-defined' if options.isBase64

    headers = {
      # Use the preview API header if one of the routes match the preview APIs
      'Accept': clientOptions.acceptHeader or DEFAULT_HEADER(path)
    }
    headers['Accept'] = 'application/vnd.github.raw' if options.raw

    # Set the `User-Agent` because it is required and NodeJS
    # does not send one by default.
    # See http://developer.github.com/v3/#user-agent-required
    headers['User-Agent'] = userAgent if userAgent

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


    if (clientOptions.token) or (clientOptions.username and clientOptions.password)
      if clientOptions.token
        auth = "token #{clientOptions.token}"
      else
        auth = 'Basic ' + base64encode("#{clientOptions.username}:#{clientOptions.password}")
      headers['Authorization'] = auth


    ajaxConfig =
      # Be sure to **not** blow the cache with a random number
      # (GitHub will respond with 5xx or CORS errors)
      url: path
      type: method
      contentType: options.contentType
      mimeType: mimeType
      headers: headers

      processData: false # Don't convert to QueryString
      data: !options.raw and data and JSON.stringify(data) or data
      dataType: 'json' unless options.raw

    # If the request is a boolean yes/no question GitHub will indicate
    # via the HTTP Status of 204 (No Content) or 404 instead of a 200.
    if options.isBoolean
      ajaxConfig.statusCode =
        204: () => cb(null, true)
        404: () => cb(null, false)

    emitter?.emit('start', method, path, data, options)

    ajax ajaxConfig, (err, val) ->

      jqXHR = err or val
      # Fire listeners when the request completes or fails

      if emitter
        rateLimit = parseFloat(jqXHR.getResponseHeader('X-RateLimit-Limit'))
        rateLimitRemaining = parseFloat(jqXHR.getResponseHeader('X-RateLimit-Remaining'))
        rateLimitReset = parseFloat(jqXHR.getResponseHeader('X-RateLimit-Reset'))

        emitterRate =
          rate:   # to match the JSON format of `GET /rate_limit`
            remaining: rateLimitRemaining
            limit: rateLimit
            reset: rateLimitReset # Reset time is in seconds, not milliseconds

        if jqXHR.getResponseHeader('X-OAuth-Scopes')
          emitterRate.scopes = jqXHR.getResponseHeader('X-OAuth-Scopes').split(', ')
        emitter.emit('request', emitterRate, method, path, data, options, jqXHR.status)

      unless err
        # Return the result and Base64 encode it if `options.isBase64` flag is set.

        # If the response was a 304 then return the cached version
        if jqXHR.status is 304
          if clientOptions.useETags and cacheHandler.get(method, path)
            eTagResponse = cacheHandler.get(method, path)

            cb(null, eTagResponse.data, eTagResponse.status, jqXHR)
          else
            cb(null, jqXHR.responseText, jqXHR.status, jqXHR)

        # Respond with the redirect URL (for archive links)
        # TODO: implement a `followRedirects` flag
        else if jqXHR.status is 302
          cb(null, jqXHR.getResponseHeader('Location'))
        # If it was a boolean question and the server responded with 204 ignore.
        else unless jqXHR.status is 204 and options.isBoolean
          if jqXHR.responseText and ajaxConfig.dataType is 'json'
            data = JSON.parse(jqXHR.responseText)

            # Only JSON responses have next/prev/first/last link headers
            # Add them to data so the resolved value is iterable

            # Parse the Link headers
            # of the form `<http://a.com>; rel="next", <https://b.com?a=b&c=d>; rel="previous"`
            links = jqXHR.getResponseHeader('Link')
            for part in links?.split(',') or []
              [discard, href, rel] = part.match(/<([^>]+)>;\ rel="([^"]+)"/)
              # Add the pagination functions on the JSON since Promises resolve one value
              # Name the functions `nextPage`, `previousPage`, `firstPage`, `lastPage`
              data["#{rel}_page_url"] = href

          else
            data = jqXHR.responseText

          # Convert the response to a Base64 encoded string
          if method is 'GET' and options.isBase64
            # Convert raw data to binary chopping off the higher-order bytes in each char.
            # Useful for Base64 encoding.
            converted = ''
            for i in [0...data.length]
              converted += String.fromCharCode(data.charCodeAt(i) & 0xff)

            data = converted

          # Cache the response to reuse later
          if method is 'GET' and jqXHR.getResponseHeader('ETag') and clientOptions.useETags
            eTag = jqXHR.getResponseHeader('ETag')
            cacheHandler.add(method, path, eTag, data, jqXHR.status)

          cb(null, data, jqXHR.status, jqXHR)

      else
        # Parse the error if one occurs

        # If the request was for a Boolean then a 404 should be treated as a "false"
        if options.isBoolean and jqXHR.status is 404
          # cb(null, false) # Already handled
        else
          err = new Error(jqXHR.responseText)
          err.status = jqXHR.status
          unless jqXHR.getResponseHeader('Content-Type') != 'application/json; charset=utf-8'
            if jqXHR.responseText
              json = JSON.parse(jqXHR.responseText)
            else
              # In the case of 404 errors, `responseText` is an empty string
              json = ''
            err.json = json
          cb(err)



module.exports = Request
