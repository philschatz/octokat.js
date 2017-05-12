const { filter, map, waterfall } = require('./plus')
const fetch = require('./adapters/fetch-node')

// Request Function
// ===============================
//
// Generates the actual HTTP requests to GitHub.
// Handles ETag caching, authentication headers, boolean requests, and paged results

// Simple jQuery.ajax() shim that returns a promise for a xhr object
let ajax = function (options, cb) {
  const fetchArgs = {
    method: options.type,
    headers: options.headers
  }
  if (options.data) {
    fetchArgs.body = options.data
  }
  return fetch(options.url, fetchArgs)
  .then((response) => {
    // for boolean responses
    if (options.statusCode && options.statusCode[response.status]) {
      return options.statusCode[response.status]()
    } else if ((response.status >= 200 && response.status < 300) || response.status === 304 || response.status === 302 || response.status === 0) {
      // Explicitly check the status code because for some reason 422 Unprocessable Entry is not an Error
      // for all other responses
      return cb(null, response)
    } else {
      return cb(response)
    }
  })
  .catch((err) => {
    if (options.statusCode && options.statusCode[err.status]) {
      return options.statusCode[err.status]()
    } else {
      // for all other responses
      return cb(err)
    }
  })
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
        let response = jqXHR

        if (err instanceof Error) {
          // There was a bug in the code (likely syntax error or null pointer)
          // so rethrow the error
          throw err
        }

        // Fire listeners when the request completes or fails
        if (this._emit && response) {
          if (response.headers.get('X-RateLimit-Limit')) {
            let rateLimit = parseFloat(response.headers.get('X-RateLimit-Limit'))
            let rateLimitRemaining = parseFloat(response.headers.get('X-RateLimit-Remaining'))
            let rateLimitReset = parseFloat(response.headers.get('X-RateLimit-Reset'))
            // Reset time is in seconds, not milliseconds
            // if rateLimitReset
            //   rateLimitReset = new Date(rateLimitReset * 1000)

            var emitterRate = {
              remaining: rateLimitRemaining,
              limit: rateLimit,
              reset: rateLimitReset
            }

            if (response.headers.get('X-OAuth-Scopes')) {
              emitterRate.scopes = response.headers.get('X-OAuth-Scopes').split(', ')
            }
          }
          this._emit('end', eventId, {method, path, data, options}, response.status, emitterRate)
        }

        if (!err) {
          // Return the result and Base64 encode it if `options.isBase64` flag is set.

          // Respond with the redirect URL (for archive links)
          // TODO: implement a `followRedirects` plugin
          if (response.status === 302) {
            return cb(null, response.headers.get('Location'))
          } else if (response.status !== 204 || !options.isBoolean) {
            // If it was a boolean question and the server responded with 204 ignore.
            let dataPromise

            // If the status was 304 then let the cache handler pick it up. leave data blank
            if (response.status === 304) {
              dataPromise = Promise.resolve(null)
            } else {
              // Convert to JSON if we are expecting JSON
              // TODO: use a blob if we are expecting a binary
              if (ajaxConfig.dataType === 'json') {
                dataPromise = response.json()
              } else {
                dataPromise = response.text()
              }
            }

            return dataPromise.then((data) => {
              acc = {
                clientOptions: this._clientOptions,
                plugins: this._plugins,
                data,
                options,
                jqXHR, // for cacheHandler
                status: response.status, // cacheHandler changes this
                request: acc, // Include the request data for plugins like cacheHandler
                requester: this, // for Hypermedia to generate verb methods
                instance: this._instance // for Hypermedia to be able to call `.fromUrl`
              }
              return this._instance._parseWithContext('', acc, function (err, val) {
                if (err) { return cb(err, val) }
                return cb(null, val, response.status, jqXHR)
              })
            })
          }
        } else {
          // Parse the error if one occurs

          // If the request was for a Boolean then a 404 should be treated as a "false"
          if (!options.isBoolean || response.status !== 404) {
            const errorTextPromise = response.text()
            errorTextPromise
            .then((errorText) => {
              err = new Error(errorText)
              err.status = response.status
              // if (response.headers.get('Content-Type') === 'application/json; charset=utf-8') {
              //   cb(new Error(response.text()))
              // }
              return cb(err)
            })
            .catch((err) => cb(err))
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
