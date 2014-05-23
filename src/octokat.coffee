define = window?.define or (cb) -> cb()
define () ->

  # require('underscore-plus')
  plus =
    camelize: (string) ->
      if string
        string.replace /[_-]+(\w)/g, (m) -> m[1].toUpperCase()
      else
        ''

    uncamelize: (string) ->
      return '' unless string
      return string.replace /([A-Z])+/g, (match, letter='') -> "_#{letter.toLowerCase()}"

    dasherize: (string) ->
      return '' unless string

      string = string[0].toLowerCase() + string[1..]
      string.replace /([A-Z])|(_)/g, (m, letter) ->
        if letter
          '-' + letter.toLowerCase()
        else
          '-'





  # Grammar
  # ===============================
  # Defines:
  # - URL_VALIDATOR : Regular expression to test all URLs before calling GitHub
  # - TREE_OPTIONS : Restricts the set of `.foos` (Derived from URL_VALIDATOR)
  # - OBJECT_MATCHER : Determines the TYPE of JSON returned from GitHub.
  #                    Used to restrict the set of `.foos` on the returned Object

  URL_VALIDATOR = /// ^

    (https?://[^/]+)? # Optional protocol, host, and port
    (/api/v3)?        # Optional API root for enterprise GitHub users

    / (
        zen
      | octocat
      | users
      | issues
      | gists
      | emojis
      | meta
      | rate_limit
      | feeds
      | events
      | gitignore/templates (/[^/]+)?

      | user
      | user/ (
          repos
        | orgs
        | followers
        | following (/[^/]+)?
        | emails    (/[^/]+)?
        | issues
        | starred   (/[^/]+){0,2}
      )

      | orgs/  [^/]+
      | orgs/  [^/]+ / (
            repos
          | issues
          | members
          | events
        )

      | users/ [^/]+
      | users/ [^/]+ / (
            repos
          | orgs
          | gists
          | followers
          | following (/[^/]+){0,2}
          | keys
          | received_events (/public)?
          | events          (/public)?
          | events/orgs/ [^/]+
        )

      | search/ (
            repositories
          | issues
          | users
          | code
        )

      | gists/ (
            public
          | starred
          | ([a-f0-9]{20}|[0-9]+)
          | ([a-f0-9]{20}|[0-9]+) /forks
          | ([a-f0-9]{20}|[0-9]+) /comments (/[0-9]+)?
          | ([a-f0-9]{20}|[0-9]+) /star
        )

      | repos (/[^/]+){2}
      | repos (/[^/]+){2} / (
            readme
          | tarball (/[^/]+)?
          | zipball (/[^/]+)?
          | compare / [a-f0-9]{40} \.{3} [a-f0-9]{40}
          | deployments
          | deployments / [0-9]+ / statuses ([0-9]+)?
          | hooks
          | hooks /[^/]+
          | hooks /[^/]+ /tests
          | assignees
          | languages
          | branches
          | contributors
          | subscribers
          | subscription
          | comments (/[0-9]+)?
          | downloads (/[0-9]+)?
          | milestones
          | labels
          | releases
          | events
          | merges
          | commits
          | commits / [a-f0-9]{40}
          | commits / [a-f0-9]{40} / comments
          | contents (/[^/]+)* # The path is allowed in the URL
          | collaborators (/[^/]+)?
          | issues
          | issues/ (
              | events
              | events/ [0-9]+
              | comments (/[0-9]+)?
              | [0-9]+
              | [0-9]+ /events
              | [0-9]+ /comments
              )

          | git/ (
                refs
              | refs / heads (/[^/]+)?
              | trees (/[^/]+)? # Can be a sha or a branch name
              | blobs (/[a-f0-9]{40}$)?
              | commits (/[a-f0-9]{40}$)?
            )
          | stats/ (
                contributors
              | commit_activity
              | code_frequency
              | participation
              | punch_card
            )
        )
    )
    $
  ///


  TREE_OPTIONS =
    'zen'         : false
    'octocat'     : false
    'users'       : false
    'issues'      : false
    'gists'       : false
    'emojis'      : false
    'meta'        : false
    'rate_limit'  : false
    'feeds'       : false
    'events'      : false
    'gitignore':
      'templates' : false
    'user':
      'repos'     : false
      'orgs'      : false
      'followers' : false
      'following' : false
      'emails'    : false
      'issues'    : false
      'starred'   : false
    'orgs':
      'repos'     : false
      'issues'    : false
      'members'   : false
      'events'    : false
    'users':
      'repos'     : false
      'orgs'      : false
      'gists'     : false
      'followers' : false
      'following' : false
      'keys'      : false
      'received_events':
        'public'  : false
      'events':
        'public'  : false
        'orgs'    : false
    'search':
      'repositories' : false
      'issues'    : false
      'users'     : false
      'code'      : false
    'gists':
      'public'    : false
      'starred'   : false
      'star'      : false
      'comments'  : false
      'forks'     : false
    'repos':
      'readme'        : false
      'tarball'       : false
      'zipball'       : false
      'compare'       : false
      'deployments':
        'statuses'    : false
      'hooks':
        'tests'       : false
      'assignees'     : false
      'languages'     : false
      'branches'      : false
      'contributors'  : false
      'subscribers'   : false
      'subscription'  : false
      'comments'      : false
      'downloads'     : false
      'milestones'    : false
      'labels'        : false
      'releases'      : false
      'events'        : false
      'merges'        : false
      'commits':
        'comments'    : false
      'contents'      : false
      'collaborators' : false
      'issues':
        'events'      : false
        'comments'    : false
      'git':
        'refs':
          'heads'     : false
        'trees'       : false
        'blobs'       : false
        'commits'     : false
      'stats':
        'contributors'    : false
        'commit_activity' : false
        'code_frequency'  : false
        'participation'   : false
        'punch_card'      : false


  OBJECT_MATCHER =
    'repos': /// ^
      (https?://[^/]+)? # Optional protocol, host, and port
      (/api/v3)?        # Optional API root for enterprise GitHub users
      /repos/ [^/]+ / [^/]+
      $
    ///
    'gists': /// ^ (https?://[^/]+)? (/api/v3)?
      /gists/ [^/]+
      $
    ///
    'issues': /// ^ (https?://[^/]+)? (/api/v3)?
      /repos/ [^/]+ / [^/]+
      /(issues|pulls) [^/]+
      $
    ///
    'users': /// ^ (https?://[^/]+)? (/api/v3)?
      /users/ [^/]+
      $
    ///
    'orgs': /// ^ (https?://[^/]+)? (/api/v3)?
      /orgs/ [^/]+
      $
    ///
    'repos.comments': /// ^
      (https?://[^/]+)? # Optional protocol, host, and port
      (/api/v3)?        # Optional API root for enterprise GitHub users
      /repos/ [^/]+ / [^/]+
      /comments/ [^/]+
      $
    ///










  # Daisy-Chainer
  # ===============================
  #
  # Generates the functions so `octo.repos(...).issues.comments.fetch()` works.
  # Constructs a URL for the verb methods (like `.fetch` and `.create`).



  # Converts a dictionary to a query string.
  # Internal helper method
  toQueryString = (options) ->

    # Returns '' if `options` is empty so this string can always be appended to a URL
    return '' if not options or options is {}

    params = []
    for key, value of options or {}
      params.push "#{key}=#{encodeURIComponent(value)}"
    return "?#{params.join('&')}"


  # Test if the path is constructed correctly
  URL_TESTER = (path) ->
    unless URL_VALIDATOR.test(path)
      err = "BUG: Invalid Path. If this is actually a valid path then please update the URL_VALIDATOR. path=#{path}"
      console.warn(err)


  Chainer = (request, _path, name, contextTree, fn) ->
    fn ?= (args...) ->
      throw new Error('BUG! must be called with at least one argument') unless args.length
      # Special-case compare because its args turn into '...' instead of the usual '/'
      if name is 'compare'
        separator = '...'
      else
        separator = '/'
      return Chainer(request, "#{_path}/#{args.join(separator)}", name, contextTree)


    verbs =
      fetch        : (config) ->   URL_TESTER(_path); request('GET', "#{_path}#{toQueryString(config)}")
      read         : (config) ->   URL_TESTER(_path); request('GET', "#{_path}#{toQueryString(config)}", null, raw:true)
      readBinary   : (config) ->   URL_TESTER(_path); request('GET', "#{_path}#{toQueryString(config)}", null, raw:true, isBase64:true)
      remove       : (config) ->   URL_TESTER(_path); request('DELETE', _path, config, isBoolean:true)
      create       : (config, isRaw) ->   URL_TESTER(_path); request('POST', _path, config, raw:isRaw)
      update       : (config) ->   URL_TESTER(_path); request('PATCH', _path, config)
      add          : (config) ->   URL_TESTER(_path); request('PUT', _path, config, isBoolean:true)
      contains     : (args...) ->  URL_TESTER(_path); request('GET', "#{_path}/#{args.join('/')}", null, isBoolean:true)

    toCallback = (orig) ->
      return (args...) ->
        last = args[args.length - 1]
        if typeof last is 'function'
          cb = args.pop()
          promise = orig(args...)
          return promise.then ((val) -> cb(null, val)), ((err) -> cb(err))
        else
          return orig(args...)

    # Allow all the verb methods to accept a callback as the last arg
    for verbName, verbFunc of verbs
      fn[verbName] = toCallback(verbFunc)


    for name of contextTree or {}
      do (name) ->
        fn.__defineGetter__ plus.camelize(name), () ->
          return Chainer(request, "#{_path}/#{name}", name, contextTree[name])


    return fn






  # JSON Replacer
  # ===============================
  #
  # - Sprinkles methods into the JSON returned from GitHub.
  #   - URL templates are converted to methods (like `compare_url`)
  #   - If the JSON matches something in OBJECT_MATCHER then additional methods
  #     are sprinkled in.
  # - Converts keys to `camelCase`

  class Replacer
    constructor: (@_request) ->

    uncamelize: (obj) ->
      if Array.isArray(obj)
        return (@uncamelize(i) for i in obj)
      else if obj == Object(obj)
        o = {}
        for key, value of obj
          o[plus.uncamelize(key)] = @uncamelize(value)
        return o
      else
        return obj

    replace: (o) ->
      if Array.isArray(o)
        return @_replaceArray(o)
      else if o == Object(o)
        return @_replaceObject(o)
      else
        return o

    _replaceObject: (orig) ->
      acc = {}
      for key, value of orig
        @_replaceKeyValue(acc, key, value)
      acc

    _replaceArray: (orig) ->
      arr = (@replace(item) for item in orig)
      # Convert the nextPage methods for paged results
      for key, value of orig
        @_replaceKeyValue(arr, key, value) if typeof key is 'string'
      arr

    # Convert things that end in `_url` to methods which return a Promise
    _replaceKeyValue: (acc, key, value) ->
      if /_url$/.test(key)
        fn = () =>
          # url can contain {name} or {/name} in the URL.
          # for every arg passed in, replace {...} with that arg
          # and remove the rest (they may or may not be optional)
          i = 0
          while m = /(\{[^\}]+\})/.exec(value)
            # `match` is something like `{/foo}`
            match = m[1]
            if i < arguments.length
              # replace it
              param = arguments[i]
              param = "/#{param}" if match[1] is '/'
            else
              # Discard the remaining optional params in the URL
              param = ''
              if match[1] isnt '/'
                throw new Error("BUG: Missing required parameter #{match}")
            value = value.replace(match, param)
            i++

          @_request('GET', value, null) # TODO: Heuristically set the isBoolean flag
        fn.url = value
        newKey = key.substring(0, key.length-'_url'.length)
        acc[plus.camelize(newKey)] = fn

      else if /_at$/.test(key)
        acc[plus.camelize(key)] = new Date(value)

      else
        acc[plus.camelize(key)] = @replace(value)










  # Promise Helper
  # ===============================
  #
  # Provides a uniform Promise API using various Promise libs (if available).
  #
  # - `newPromise` : constructs a new Promise
  # - `allPromises` : waits until all Promises have succeeded


  if window?
    # Running in a browser

    # Determine the correct Promise factory.
    # Try to use libraries before native Promises since most Promise users
    # are already using a library.
    #
    # Try in the following order:
    # - Q Promise
    # - angularjs Promise
    # - jQuery Promise
    # - native Promise or a polyfill
    if @Q
      newPromise = (fn) =>
        deferred = @Q.defer()
        resolve = (val) -> deferred.resolve(val)
        reject  = (err) -> deferred.reject(err)
        fn(resolve, reject)
        return deferred.promise
      allPromises = (promises) -> @Q.all(promises)
    else if @angular
      newPromise = null
      allPromises = null

      # Details on Angular Promises: http://docs.angularjs.org/api/ng/service/$q
      injector = angular.injector(['ng'])
      injector.invoke ($q) ->
        newPromise = (fn) ->
          deferred = $q.defer()
          resolve = (val) -> deferred.resolve(val)
          reject  = (err) -> deferred.reject(err)
          fn(resolve, reject)
          return deferred.promise
        allPromises = (promises) -> $q.all(promises)
    else if @jQuery?.Deferred
      newPromise = (fn) =>
        promise = @jQuery.Deferred()
        resolve = (val) -> promise.resolve(val)
        reject  = (val) -> promise.reject(val)
        fn(resolve, reject)
        return promise.promise()
      allPromises = (promises) =>
        # `jQuery.when` is a little odd.
        # - It accepts each promise as an argument (instead of an array of promises)
        # - Each resolved value is an argument (instead of an array of values)
        #
        # So, convert the array of promises to args and then the resolved args to an array
        return @jQuery.when(promises...).then((promises...) -> return promises)
    else if @Promise
      newPromise = (fn) => return new @Promise (resolve, reject) ->
        # Some browsers (like node-webkit 0.8.6) contain an older implementation
        # of Promises that provide 1 argument (a `PromiseResolver`).
        if resolve.fulfill
          fn(resolve.resolve.bind(resolve), resolve.reject.bind(resolve))
        else
          fn(arguments...)

      allPromises = (promises) => @Promise.all(promises)

    else
      # Otherwise, throw an error
      err = (msg) ->
        console?.error?(msg)
        throw new Error(msg)
      err('A Promise API was not found. Supported libraries that have Promises are jQuery, angularjs, and es6-promise')

  else
    # Running in NodeJS

    req = require # Hack so requireJS does not try to load `es6-promise` in the browser
    # Use native promises if Harmony is on
    Promise     = @Promise or req('es6-promise').Promise
    newPromise  = (fn) -> return new Promise(fn)
    allPromises = (promises) -> return Promise.all(promises)







  # Base64 Encoder
  # ===============================
  #
  # Used for sending binary files and encoding the auth username/password

  # Use the `Buffer` if available (NodeJS)
  if @Buffer
    base64encode = (str) ->
      buffer = new @Buffer(str, 'binary')
      return buffer.toString('base64')
  else
    throw new Error('Native btoa function is missing') unless @btoa
    base64encode = @btoa

















  # Request Function
  # ===============================
  #
  # Generates the actual HTTP requests to GitHub.
  # Handles ETag caching, authentication headers, boolean requests, and paged results

  userAgent = 'octokat.js' unless window?

  # Simple jQuery.ajax() shim that returns a promise for a xhr object
  ajax = (options) ->
    return newPromise (resolve, reject) ->

      # Use the browser XMLHttpRequest if it exists. If not, then this is NodeJS
      # Pull this in for every request so sepia.js has a chance to override `window.XMLHTTPRequest`
      req = require
      XMLHttpRequest = window?.XMLHttpRequest or req('xmlhttprequest').XMLHttpRequest

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
            resolve(xhr)
          else
            reject(xhr)
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

    # These are updated whenever a request is made
    _listeners = []

    # Cached responses are stored in this object keyed by `path`
    _cachedETags = {}

    # HTTP Request Abstraction
    # =======
    #
    return (method, path, data, options={raw:false, isBase64:false, isBoolean:false}) ->

      console.log method, path, data

      if method is 'PATCH' and clientOptions.usePostInsteadOfPatch
        method = 'POST'

      # Only prefix the path when it does not begin with http.
      # This is so pagination works (which provides absolute URLs).
      path = "#{clientOptions.rootURL}#{path}" if not /^http/.test(path)

      # Support binary data by overriding the response mimeType
      mimeType = undefined
      mimeType = 'text/plain; charset=x-user-defined' if options.isBase64

      headers = {
        'Accept': 'application/vnd.github.raw'
      }

      # Set the `User-Agent` because it is required and NodeJS
      # does not send one by default.
      # See http://developer.github.com/v3/#user-agent-required
      headers['User-Agent'] = userAgent if userAgent

      # Send the ETag if re-requesting a URL
      if "#{method} #{path}" of _cachedETags
        headers['If-None-Match'] = _cachedETags["#{method} #{path}"].eTag
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


      promise = newPromise (resolve, reject) ->

        ajaxConfig =
          # Be sure to **not** blow the cache with a random number
          # (GitHub will respond with 5xx or CORS errors)
          url: path
          type: method
          contentType: 'application/json'
          mimeType: mimeType
          headers: headers

          processData: false # Don't convert to QueryString
          data: !options.raw and data and JSON.stringify(data) or data
          dataType: 'json' unless options.raw

        # If the request is a boolean yes/no question GitHub will indicate
        # via the HTTP Status of 204 (No Content) or 404 instead of a 200.
        if options.isBoolean
          ajaxConfig.statusCode =
            204: () => resolve(true)
            404: () => resolve(false)

        xhrPromise = ajax(ajaxConfig)

        always = (jqXHR) =>
          # Fire listeners when the request completes or fails
          rateLimit = parseFloat(jqXHR.getResponseHeader 'X-RateLimit-Limit')
          rateLimitRemaining = parseFloat(jqXHR.getResponseHeader 'X-RateLimit-Remaining')

          for listener in _listeners
            listener(rateLimitRemaining, rateLimit, method, path, data, options)


        # Return the result and Base64 encode it if `options.isBase64` flag is set.
        xhrPromise.then (jqXHR) ->
          always(jqXHR)

          # If the response was a 304 then return the cached version
          if jqXHR.status is 304
            if clientOptions.useETags and _cachedETags["#{method} #{path}"]
              eTagResponse = _cachedETags["#{method} #{path}"]

              resolve(eTagResponse.data, eTagResponse.status, jqXHR)
            else
              resolve(jqXHR.responseText, status, jqXHR)

          # If it was a boolean question and the server responded with 204
          # return true.
          else if jqXHR.status is 204 and options.isBoolean
            resolve(true, status, jqXHR)
          # Respond with the redirect URL (for archive links)
          # TODO: implement a `followRedirects` flag
          else if jqXHR.status is 302
            resolve(jqXHR.getResponseHeader('Location'))
          else
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
              for i in [0..data.length]
                converted += String.fromCharCode(data.charCodeAt(i) & 0xff)

              data = converted

            # Cache the response to reuse later
            if method is 'GET' and jqXHR.getResponseHeader('ETag') and clientOptions.useETags
              eTag = jqXHR.getResponseHeader('ETag')
              _cachedETags["#{method} #{path}"] = new ETagResponse(eTag, data, jqXHR.status)

            resolve(data, jqXHR.status, jqXHR)

        # Parse the error if one occurs
        onError = (jqXHR) ->
          always(jqXHR)

          # If the request was for a Boolean then a 404 should be treated as a "false"
          if options.isBoolean and jqXHR.status is 404
            resolve(false)
          else
            if jqXHR.getResponseHeader('Content-Type') != 'application/json; charset=utf-8'
              reject {error: jqXHR.responseText, status: jqXHR.status, _jqXHR: jqXHR}
            else
              if jqXHR.responseText
                json = JSON.parse(jqXHR.responseText)
              else
                # In the case of 404 errors, `responseText` is an empty string
                json = ''
              reject {error: json, status: jqXHR.status, _jqXHR: jqXHR}

        # Depending on the Promise implementation, the `catch` method may be `.catch` or `.fail`
        xhrPromise.then(null, onError)

      # Return the promise
      return promise











  # Combine all the classes into one client

  Octokat = (clientOptions={}) ->

    # For each request, convert the JSON into Objects
    _request = Request(clientOptions)

    request = (method, path, data, options={raw:false, isBase64:false, isBoolean:false}) ->
      replacer = new Replacer(request)

      data = replacer.uncamelize(data) if data

      return _request(method, path, data, options)
      .then (val) ->
        return val if options.raw
        obj = replacer.replace(val)
        url = obj.url or path
        for key, re of OBJECT_MATCHER
          if re.test(url)
            context = TREE_OPTIONS
            for k in key.split('.')
              context = context[k]
            Chainer(request, url, k, context, obj)
        return obj

    path = ''
    obj = {}
    Chainer(request, path, null, TREE_OPTIONS, obj)

    # Special case for `me`
    obj.me = obj.user
    delete obj.user


    return obj


  module?.exports = Octokat
  window?.Octokat = Octokat
  return Octokat
