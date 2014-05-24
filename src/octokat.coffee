define = window?.define or (name, deps, cb) -> cb((require(dep.replace('cs!octokat-part/', './')) for dep in deps)...)
define 'octokat', ['cs!octokat-part/plus', 'cs!octokat-part/grammar', 'cs!octokat-part/chainer', 'cs!octokat-part/replacer', 'cs!octokat-part/request'], (plus, {TREE_OPTIONS, OBJECT_MATCHER}, Chainer, Replacer, Request) ->

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

    # Add the GitHub Status API https://status.github.com/api
    obj.status =      () -> request 'GET', 'https://status.github.com/api/status.json'
    obj.status.api =  () -> request 'GET', 'https://status.github.com/api.json'
    obj.status.lastMessage = () -> request 'GET', 'https://status.github.com/api/last-message.json'
    obj.status.messages = () -> request 'GET', 'https://status.github.com/api/messages.json'

    return obj


  module?.exports = Octokat
  window?.Octokat = Octokat
  return Octokat
