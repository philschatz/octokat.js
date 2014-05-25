define = window?.define or (name, deps, cb) -> cb((require(dep.replace('cs!octokat-part/', './')) for dep in deps)...)
define 'octokat-part/chainer', ['cs!octokat-part/grammar', 'cs!octokat-part/plus'], ({URL_VALIDATOR}, plus) ->

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
    if name # Skip adding these on the root
      for verbName, verbFunc of verbs
        fn[verbName] = toCallback(verbFunc)


    for name of contextTree or {}
      do (name) ->
        fn.__defineGetter__ plus.camelize(name), () ->
          return Chainer(request, "#{_path}/#{name}", name, contextTree[name])


    return fn


  module?.exports = Chainer
  return Chainer
