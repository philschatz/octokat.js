// Request Function
// ===============================
//
// Generates the actual HTTP requests to GitHub.
// Handles ETag caching, authentication headers, boolean requests, and paged results

// # Construct the request function.
// It contains all the auth credentials passed in to the client constructor

module.exports = class Requestor {
  constructor (fetchImpl, userAgent, usePostInsteadOfPatch) {
    this._fetchImpl = fetchImpl
    // Set the `User-Agent` because it is required and NodeJS
    // does not send one by default.
    // See http://developer.github.com/v3/#user-agent-required
    this._userAgent = userAgent || 'octokat.js'
    this._usePostInsteadOfPatch = usePostInsteadOfPatch
  }

  request (method, path, data, isRaw, isBase64, isBoolean, contentType, acceptHeader) {
    if (!/^http/.test(path)) {
      throw new Error('BUG: All Paths must be absolute (start with https://)')
    }

    const headers = {
      'Accept': isRaw ? 'application/vnd.github.raw' : acceptHeader || 'application/json',
      'User-Agent': this._userAgent
    }

    let fetchArgs = {
      // TODO: add the followRedirects flag
      method,
      headers,
      body: (!isRaw && data && JSON.stringify(data)) || data
    }

    return this._fetchImpl(path, fetchArgs)
    .then((response) => {
      // Collect any response headers into an object
      const additional = {}
      if (response.headers.get('X-RateLimit-Limit')) {
        let rateLimit = parseFloat(response.headers.get('X-RateLimit-Limit'))
        let rateLimitRemaining = parseFloat(response.headers.get('X-RateLimit-Remaining'))
        let rateLimitReset = parseFloat(response.headers.get('X-RateLimit-Reset'))
        // Reset time is in seconds, not milliseconds
        // if rateLimitReset
        //   rateLimitReset = new Date(rateLimitReset * 1000)
        additional.rate = {
          remaining: rateLimitRemaining,
          limit: rateLimit,
          reset: rateLimitReset
        }

        if (response.headers.get('X-OAuth-Scopes')) {
          additional.scopes = response.headers.get('X-OAuth-Scopes').split(', ')
        }
      }

      // Massage the value we return
      let valuePromise

      if (isBoolean && response.status === 204) {
        // If the request is a boolean yes/no question GitHub will indicate
        // via the HTTP Status of 204 (No Content) or 404 instead of a 200.
        valuePromise = Promise.resolve(true)
      } else if (isBoolean && response.status === 404) {
        valuePromise = Promise.resolve(false)
      } else if ((response.status >= 200 && response.status < 300) || response.status === 304 || response.status === 302 || response.status === 0) {
        // If it was a boolean question and the server responded with 204 ignore.

        // If the status was 304 then let the cache handler pick it up. leave data blank
        if (response.status === 304) {
          valuePromise = Promise.resolve(null)
        } else {
          // TODO: use a blob if we are expecting a binary

          const contentType = response.headers.get('content-type') || ''

          // Use .indexOf instead of .startsWith because PhantomJS does not support .startsWith
          if (contentType.indexOf('application/json') === 0) {
            valuePromise = response.json()
          } else {
            // Other contentTypes:
            // - 'text/plain'
            // - 'application/octocat-stream'
            // - 'application/vnd.github.raw'
            valuePromise = response.text()
          }
        }
      } else {
        // TODO: Reject the Promise
        valuePromise = response.text().then((text) => {
          return Promise.reject(new Error(`${text} ${fetchArgs.method} ${path} Status: ${response.status}`))
        })
      }

      return valuePromise.then((value) => {
        // TODO: return new OctokatResponse()
        return {
          value: value,
          request: {
            url: path,
            method: fetchArgs.method,
            headers: fetchArgs.headers,
            body: fetchArgs.body
          },
          response: {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            ok: response.ok,
            size: response.size,
            timeout: response.timeout
          },
          additional: additional
        }
      })
    })
  }
}
