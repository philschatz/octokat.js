{filter, forEach, extend} = require './plus'


# Request Function
# ===============================
#
# Generates the actual HTTP requests to GitHub.
# Handles ETag caching, authentication headers, boolean requests, and paged results

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


# # Construct the request function.
# It contains all the auth credentials passed in to the client constructor

eventId = 0 # counter for the emitter so it is easier to match up requests

module.exports = class Requester
  constructor: (@_instance, @_clientOptions={}, plugins) ->

    # Provide an option to override the default URL
    @_clientOptions.rootURL ?= 'https://api.github.com'
    @_clientOptions.useETags ?= true
    @_clientOptions.usePostInsteadOfPatch ?= false

    # These are updated whenever a request is made (optional)
    if typeof @_clientOptions.emitter is 'function'
      @_emit = @_clientOptions.emitter

    @_pluginMiddleware = filter plugins, ({requestMiddleware}) -> requestMiddleware

  # HTTP Request Abstraction
  # =======
  #
  request: (method, path, data, options={isRaw:false, isBase64:false, isBoolean:false, contentType:'application/json'}, cb) ->

    options             ?= {}
    options.isRaw       ?= false
    options.isBase64    ?= false
    options.isBoolean   ?= false
    options.contentType ?= 'application/json'

    # console.log method, path, data, options, typeof cb

    # Only prefix the path when it does not begin with http.
    # This is so pagination works (which provides absolute URLs).
    path = "#{@_clientOptions.rootURL}#{path}" if not /^http/.test(path)

    headers =
      'Accept': @_clientOptions.acceptHeader or 'application/json'

    unless window?
      # Set the `User-Agent` because it is required and NodeJS
      # does not send one by default.
      # See http://developer.github.com/v3/#user-agent-required
      headers['User-Agent'] = 'octokat.js'

    acc = {method, path, headers, options, clientOptions: @_clientOptions}
    forEach @_pluginMiddleware, (plugin) ->
      {method, headers, mimeType} = plugin.requestMiddleware(acc) or {}
      acc.method = method if method
      acc.mimeType = mimeType if mimeType
      extend(acc.headers, headers)

    {method, headers, mimeType} = acc

    headers['Accept'] = 'application/vnd.github.raw' if options.isRaw

    ajaxConfig =
      # Be sure to **not** blow the cache with a random number
      # (GitHub will respond with 5xx or CORS errors)
      url: path
      type: method
      contentType: options.contentType
      mimeType: mimeType
      headers: headers

      processData: false # Don't convert to QueryString
      data: !options.isRaw and data and JSON.stringify(data) or data
      dataType: 'json' unless options.isRaw

    # If the request is a boolean yes/no question GitHub will indicate
    # via the HTTP Status of 204 (No Content) or 404 instead of a 200.
    if options.isBoolean
      ajaxConfig.statusCode =
        204: () => cb(null, true)
        404: () => cb(null, false)

    eventId++
    @_emit?('start', eventId, {method, path, data, options})

    ajax ajaxConfig, (err, val) =>
      jqXHR = err or val

      # Fire listeners when the request completes or fails
      if @_emit

        if jqXHR.getResponseHeader('X-RateLimit-Limit')
          rateLimit = parseFloat(jqXHR.getResponseHeader('X-RateLimit-Limit'))
          rateLimitRemaining = parseFloat(jqXHR.getResponseHeader('X-RateLimit-Remaining'))
          rateLimitReset = parseFloat(jqXHR.getResponseHeader('X-RateLimit-Reset'))
          # Reset time is in seconds, not milliseconds
          # if rateLimitReset
          #   rateLimitReset = new Date(rateLimitReset * 1000)

          emitterRate =
            remaining: rateLimitRemaining
            limit: rateLimit
            reset: rateLimitReset

          if jqXHR.getResponseHeader('X-OAuth-Scopes')
            emitterRate.scopes = jqXHR.getResponseHeader('X-OAuth-Scopes').split(', ')
        @_emit('end', eventId, {method, path, data, options}, jqXHR.status, emitterRate)

      unless err
        # Return the result and Base64 encode it if `options.isBase64` flag is set.

        # Respond with the redirect URL (for archive links)
        # TODO: implement a `followRedirects` plugin
        if jqXHR.status is 302
          cb(null, jqXHR.getResponseHeader('Location'))
        # If it was a boolean question and the server responded with 204 ignore.
        else unless jqXHR.status is 204 and options.isBoolean
          if jqXHR.responseText and ajaxConfig.dataType is 'json'
            data = JSON.parse(jqXHR.responseText)

          else
            data = jqXHR.responseText


          acc = {
            clientOptions: @_clientOptions
            data
            options
            jqXHR # for cacheHandler
            status: jqXHR.status # cacheHandler changes this
            request: acc # Include the request data for plugins like cacheHandler
            requester: @ # for Hypermedia to generate verb methods
            instance: @_instance # for Hypermedia to be able to call `.fromUrl`
          }
          data = @_instance._parseWithContext('', acc)

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
              try
                json = JSON.parse(jqXHR.responseText)
              catch
                cb({message: 'Error Parsing Response'})
            else
              # In the case of 404 errors, `responseText` is an empty string
              json = ''
            err.json = json
          cb(err)
