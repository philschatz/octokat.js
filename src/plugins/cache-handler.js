module.exports = new class CacheHandler {
  constructor () {
    this._cachedETags = {}
  }

  // Default cacheHandler methods
  get (method, path) {
    return this._cachedETags[`${method} ${path}`]
  }

  add (method, path, eTag, data, status) {
    return this._cachedETags[`${method} ${path}`] = {eTag, data, status}
  }

  requestMiddlewareAsync (input, cb) {
    let {clientOptions, method, path} = input
    if (input.headers == null) { input.headers = {} }
    let cacheHandler = clientOptions.cacheHandler || this
    // Send the ETag if re-requesting a URL
    if (cacheHandler.get(method, path)) {
      input.headers['If-None-Match'] = cacheHandler.get(method, path).eTag
    } else {
      // The browser will sneak in a 'If-Modified-Since' header if the GET has been requested before
      // but for some reason the cached response does not seem to be available
      // in the jqXHR object.
      // So, the first time a URL is requested set this date to 0 so we always get a response the 1st time
      // a URL is requested.
      input.headers['If-Modified-Since'] = 'Thu, 01 Jan 1970 00:00:00 GMT'
    }

    return cb(null, input)
  }

  responseMiddlewareAsync (input, cb) {
    let {clientOptions, request, status, jqXHR, data} = input
    if (!jqXHR) { return cb(null, input) } // The plugins are all used in `octo.parse()` which does not have a jqXHR

    // Since this can be called via `octo.parse`, skip caching when there is no jqXHR
    if (jqXHR) {
      let {method, path} = request // This is also not defined when octo.parse is called

      let cacheHandler = clientOptions.cacheHandler || this
      if (status === 304 || status === 0) {
        let ref = cacheHandler.get(method, path)
        if (ref) {
          var eTag;
          ({data, status, eTag} = ref)
          // Set a flag on the object so users know this is a cached response
          data.__IS_CACHED = eTag || true
        } else {
          throw new Error(`ERROR: Bug in Octokat cacheHandler for path '${method} ${path}'. It had an eTag but not the cached response.`)
        }
      } else {
        // Cache the response to reuse later
        if (method === 'GET' && jqXHR.getResponseHeader('ETag')) {
          var eTag = jqXHR.getResponseHeader('ETag')
          cacheHandler.add(method, path, eTag, data, jqXHR.status)
        }
      }

      input.data = data
      input.status = status
      return cb(null, input)
    }
  }
}()
