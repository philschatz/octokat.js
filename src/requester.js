const { filter, map, waterfall } = require('./plus')

// Request Function
// ===============================
//
// Generates the actual HTTP requests to GitHub.
// Handles ETag caching, authentication headers, boolean requests, and paged results

// Simple jQuery.ajax() shim that returns a promise for a xhr object
let ajax = function (options, cb) {
  // Use the browser XMLHttpRequest if it exists. If not, then this is NodeJS
  // Pull this in for every request so sepia.js has a chance to override `window.XMLHTTPRequest`
  const XMLHttpRequest = require('./adapters/xhr')
  let xhr = new XMLHttpRequest()
  xhr.dataType = options.dataType
  if (options.mimeType) {
    __guardFunc__(xhr.overrideMimeType, f => f(options.mimeType))
  }
  xhr.open(options.type, options.url)

  if (options.data && options.type !== 'GET') {
    xhr.setRequestHeader('Content-Type', options.contentType)
  }

  for (let name in options.headers) {
    let value = options.headers[name]
    xhr.setRequestHeader(name, value)
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      __guardFunc__(__guard__(options.statusCode, x => x[xhr.status]), f1 => f1())

      // When disconnected, pass if the status is 0 so the cacheHandler has a chance to return the cached version
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304 || xhr.status === 302 || xhr.status === 0) {
        return cb(null, xhr)
      } else {
        return cb(xhr)
      }
    }
  }
  return xhr.send(options.data)
}

// # Construct the request function.
// It contains all the auth credentials passed in to the client constructor

let EVENT_ID = 0 // counter for the emitter so it is easier to match up requests

module.exports = class Requester {
  constructor (_instance, _clientOptions = {}, plugins) {
    // Provide an option to override the default URL
    this._instance = _instance
    this._clientOptions = _clientOptions
    if (this._clientOptions.rootURL == null) { this._clientOptions.rootURL = 'https://api.github.com' }
    if (this._clientOptions.useETags == null) { this._clientOptions.useETags = true }
    if (this._clientOptions.usePostInsteadOfPatch == null) { this._clientOptions.usePostInsteadOfPatch = false }

    // These are updated whenever a request is made (optional)
    if (typeof this._clientOptions.emitter === 'function') {
      this._emit = this._clientOptions.emitter
    }

    this._pluginMiddlewareAsync = map(filter(plugins, ({requestMiddlewareAsync}) => requestMiddlewareAsync), plugin => plugin.requestMiddlewareAsync.bind(plugin)
    )
    this._plugins = plugins
  }

  // HTTP Request Abstraction
  // =======
  //
  request (method, path, data, options = {isRaw: false, isBase64: false, isBoolean: false, contentType: 'application/json'}, cb) {
    if (typeof options === 'undefined' || options === null) { options = {} }
    if (options.isRaw == null) { options.isRaw = false }
    if (options.isBase64 == null) { options.isBase64 = false }
    if (options.isBoolean == null) { options.isBoolean = false }
    if (options.contentType == null) { options.contentType = 'application/json' }

    // console.log method, path, data, options, typeof cb

    // Only prefix the path when it does not begin with http.
    // This is so pagination works (which provides absolute URLs).
    if (!/^http/.test(path)) { path = `${this._clientOptions.rootURL}${path}` }

    let headers =
      {'Accept': this._clientOptions.acceptHeader || 'application/json'}

    if (typeof window === 'undefined' || window === null) {
      // Set the `User-Agent` because it is required and NodeJS
      // does not send one by default.
      // See http://developer.github.com/v3/#user-agent-required
      headers['User-Agent'] = 'octokat.js'
    }

    let acc = {method, path, headers, options, clientOptions: this._clientOptions}

    // To use async.waterfall we need to pass in the initial data (`acc`)
    // so we create an initial function that just takes a callback
    let initial = cb => cb(null, acc)
    let pluginsPlusInitial = [initial].concat(this._pluginMiddlewareAsync)

    return waterfall(pluginsPlusInitial, (err, acc) => {
      let mimeType
      if (err) { return cb(err, acc) }

      ({method, headers, mimeType} = acc)

      if (options.isRaw) { headers['Accept'] = 'application/vnd.github.raw' }

      let ajaxConfig = {
        // Be sure to **not** blow the cache with a random number
        // (GitHub will respond with 5xx or CORS errors)
        url: path,
        type: method,
        contentType: options.contentType,
        mimeType,
        headers,

        processData: false, // Don't convert to QueryString
        data: (!options.isRaw && data && JSON.stringify(data)) || data,
        dataType: !options.isRaw ? 'json' : undefined
      }

      // If the request is a boolean yes/no question GitHub will indicate
      // via the HTTP Status of 204 (No Content) or 404 instead of a 200.
      if (options.isBoolean) {
        ajaxConfig.statusCode = {
          204: () => cb(null, true),
          404: () => cb(null, false)
        }
      }

      let eventId = ++EVENT_ID
      __guardFunc__(this._emit, f => f('start', eventId, {method, path, data, options}))

      return ajax(ajaxConfig, (err, val) => {
        let jqXHR = err || val

        // Fire listeners when the request completes or fails
        if (this._emit) {
          if (jqXHR.getResponseHeader('X-RateLimit-Limit')) {
            let rateLimit = parseFloat(jqXHR.getResponseHeader('X-RateLimit-Limit'))
            let rateLimitRemaining = parseFloat(jqXHR.getResponseHeader('X-RateLimit-Remaining'))
            let rateLimitReset = parseFloat(jqXHR.getResponseHeader('X-RateLimit-Reset'))
            // Reset time is in seconds, not milliseconds
            // if rateLimitReset
            //   rateLimitReset = new Date(rateLimitReset * 1000)

            var emitterRate = {
              remaining: rateLimitRemaining,
              limit: rateLimit,
              reset: rateLimitReset
            }

            if (jqXHR.getResponseHeader('X-OAuth-Scopes')) {
              emitterRate.scopes = jqXHR.getResponseHeader('X-OAuth-Scopes').split(', ')
            }
          }
          this._emit('end', eventId, {method, path, data, options}, jqXHR.status, emitterRate)
        }

        if (!err) {
          // Return the result and Base64 encode it if `options.isBase64` flag is set.

          // Respond with the redirect URL (for archive links)
          // TODO: implement a `followRedirects` plugin
          if (jqXHR.status === 302) {
            return cb(null, jqXHR.getResponseHeader('Location'))
          // If it was a boolean question and the server responded with 204 ignore.
          } else if (jqXHR.status !== 204 || !options.isBoolean) {
            if (jqXHR.responseText && ajaxConfig.dataType === 'json') {
              data = JSON.parse(jqXHR.responseText)
            } else {
              data = jqXHR.responseText
            }

            acc = {
              clientOptions: this._clientOptions,
              plugins: this._plugins,
              data,
              options,
              jqXHR, // for cacheHandler
              status: jqXHR.status, // cacheHandler changes this
              request: acc, // Include the request data for plugins like cacheHandler
              requester: this, // for Hypermedia to generate verb methods
              instance: this._instance // for Hypermedia to be able to call `.fromUrl`
            }
            return this._instance._parseWithContext('', acc, function (err, val) {
              if (err) { return cb(err, val) }
              return cb(null, val, jqXHR.status, jqXHR)
            }
            )
          }
        } else {
          // Parse the error if one occurs

          // If the request was for a Boolean then a 404 should be treated as a "false"
          if (!options.isBoolean || jqXHR.status !== 404) {
            err = new Error(jqXHR.responseText)
            err.status = jqXHR.status
            if (jqXHR.getResponseHeader('Content-Type') === 'application/json; charset=utf-8') {
              let json = ''
              if (jqXHR.responseText) {
                try {
                  json = JSON.parse(jqXHR.responseText)
                } catch (error) {
                  cb({message: 'Error Parsing Response'})
                }
              } else {
                // In the case of 404 errors, `responseText` is an empty string
                json = ''
              }
              err.json = json
            }
            return cb(err)
          }
        }
      }
      )
    }
    )
  }
}

function __guardFunc__ (func, transform) {
  return typeof func === 'function' ? transform(func) : undefined
}
function __guard__ (value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined
}
