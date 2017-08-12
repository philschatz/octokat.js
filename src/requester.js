const { filter, map } = require('./plus')

// Request Function
// ===============================
//
// Generates the actual HTTP requests to GitHub.
// Handles ETag caching, authentication headers, boolean requests, and paged results

// # Construct the request function.
// It contains all the auth credentials passed in to the client constructor

let EVENT_ID = 0 // counter for the emitter so it is easier to match up requests

module.exports = class Requester {
  constructor (_instance, _clientOptions = {}, plugins, fetchImpl) {
    // Provide an option to override the default URL
    this._instance = _instance
    this._clientOptions = _clientOptions
    if (this._clientOptions.rootURL == null) { this._clientOptions.rootURL = 'https://api.github.com' }
    if (this._clientOptions.useETags == null) { this._clientOptions.useETags = true }
    if (this._clientOptions.usePostInsteadOfPatch == null) { this._clientOptions.usePostInsteadOfPatch = false }
    if (this._clientOptions.userAgent == null) {
      if (typeof window === 'undefined' || window === null) {
        // Set the `User-Agent` because it is required and NodeJS
        // does not send one by default.
        // See http://developer.github.com/v3/#user-agent-required
        this._clientOptions.userAgent = 'octokat.js'
      }
    }

    // These are updated whenever a request is made (optional)
    if (typeof this._clientOptions.emitter === 'function') {
      this._emit = this._clientOptions.emitter
    }

    this._pluginMiddlewareAsync = map(filter(plugins, ({requestMiddlewareAsync}) => requestMiddlewareAsync), plugin => plugin.requestMiddlewareAsync.bind(plugin)
    )
    this._plugins = plugins
    this._fetchImpl = fetchImpl
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

    let headers = {
      'Accept': this._clientOptions.acceptHeader || 'application/json'
    }

    // Safari/Firefox do not like setting the user-agent header
    if (this._clientOptions.userAgent) {
      headers['User-Agent'] = this._clientOptions.userAgent
    }

    let acc = {method, path, headers, options, clientOptions: this._clientOptions}

    // To use async.waterfall we need to pass in the initial data (`acc`)
    // so we create an initial function that just takes a callback
    let initial = Promise.resolve(acc)

    let prev = initial
    this._pluginMiddlewareAsync.forEach((p) => {
      prev = prev.then(p)
    })
    return prev.then((acc) => {
      ({method, headers} = acc)

      if (options.isRaw) { headers['Accept'] = 'application/vnd.github.raw' }

      let fetchArgs = {
        // Be sure to **not** blow the cache with a random number
        // (GitHub will respond with 5xx or CORS errors)
        method,
        headers,
        body: (!options.isRaw && data && JSON.stringify(data)) || data
      }

      let eventId = ++EVENT_ID
      __guardFunc__(this._emit, f => f('start', eventId, {method, path, data, options}))

      return this._fetchImpl(path, fetchArgs)
      .then((response) => {
        let jqXHR = response

        // Fire listeners when the request completes or fails
        if (this._emit) {
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

        // Return the result and Base64 encode it if `options.isBase64` flag is set.

        // Respond with the redirect URL (for archive links)
        // TODO: implement a `followRedirects` plugin
        if (response.status === 302) {
          return response.headers.get('Location')
        } else if (options.isBoolean && response.status === 204) {
          // If the request is a boolean yes/no question GitHub will indicate
          // via the HTTP Status of 204 (No Content) or 404 instead of a 200.
          return true
        } else if (options.isBoolean && response.status === 404) {
          return false
        // } else if (options.isBoolean) {
        //   throw new Error(`Octokat Bug? got a response to a boolean question that was not 204 or 404.  ${fetchArgs.method} ${path} Status: ${response.status}`)
        } else if ((response.status >= 200 && response.status < 300) || response.status === 304 || response.status === 302 || response.status === 0) {
          // If it was a boolean question and the server responded with 204 ignore.
          let dataPromise

          // If the status was 304 then let the cache handler pick it up. leave data blank
          if (response.status === 304) {
            dataPromise = Promise.resolve(null)
          } else {
            // TODO: use a blob if we are expecting a binary

            const contentType = response.headers.get('content-type') || ''

            // Use .indexOf instead of .startsWith because PhantomJS does not support .startsWith
            if (contentType.indexOf('application/json') === 0) {
              dataPromise = response.json()
            } else {
              // Other contentTypes:
              // - 'text/plain'
              // - 'application/octocat-stream'
              // - 'application/vnd.github.raw'
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
            return this._instance._parseWithContextPromise('', acc)
          })
        } else {
          return response.text().then((text) => {
            return Promise.reject(new Error(`${text} ${fetchArgs.method} ${path} Status: ${response.status}`))
          })
        }
      })
    })
  }
}

function __guardFunc__ (func, transform) {
  return typeof func === 'function' ? transform(func) : undefined
}
