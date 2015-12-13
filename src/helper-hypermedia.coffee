toQueryString = require './helper-querystring'

module.exports = (url, args...) ->

  # url can contain {name} or {/name} in the URL.
  # for every arg passed in, replace {...} with that arg
  # and remove the rest (they may or may not be optional)
  i = 0
  while m = /(\{[^\}]+\})/.exec(url)
    # `match` is something like `{/foo}`
    match = m[1]
    if i < args.length
      # replace it
      param = args[i]
      switch match[1]
        when '/'
          param = "/#{param}"
        when '?'
          # Strip off the "{?" and the trailing "}"
          # For example, the URL is `/assets{?name,label}`
          #   which turns into `/assets?name=foo.zip`
          # Used to upload releases via the repo releases API.
          # TODO: When match contains `,` or
          # `args.length is 1` and args[0] is object match the args to those in the template
          optionalNames = match[2..-2].split(',')
          # If param is a string then just use the 1st optionalName
          if typeof param is 'object'
            # TODO: validate the optionalNames
            if Object.keys(param).length is 0
              console.warn('Must pass in a dictionary with at least one key when there are multiple optional params')
            for paramName in Object.keys(param)
              if optionalNames.indexOf(paramName) < 0
                console.warn("Invalid parameter '#{paramName}' passed in as argument")
            param = toQueryString(param)
          else
            param = "?#{optionalNames[0]}=#{param}"

    else
      # Discard the remaining optional params in the URL
      param = ''
      if match[1] isnt '/'
        throw new Error("BUG: Missing required parameter #{match}")
    url = url.replace(match, param)
    i++

  url
