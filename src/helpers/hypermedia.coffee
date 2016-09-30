toQueryString = require './querystring'
deprecate = require '../deprecate'

module.exports = (url, args...) ->

  # Deprecated interface. Use an Object to specify the args in the template.
  # the order of fields in the template should not matter.
  if args.length is 0
    templateParams = {}
  else
    if args.length > 1
      deprecate('When filling in a template URL pass all the field to fill in 1 object instead of comma-separated args')

    templateParams = args[0]

  # url can contain {name} or {/name} in the URL.
  # for every arg passed in, replace {...} with that arg
  # and remove the rest (they may or may not be optional)
  i = 0
  while m = /(\{[^\}]+\})/.exec(url)
    # `match` is something like `{/foo}` or `{?foo,bar}` or `{foo}` (last one means it is required)
    match = m[1]
    param = ''
    # replace it
    switch match[1]
      when '/'
        fieldName = match[2...match.length-1] # omit the braces and the slash
        fieldValue = templateParams[fieldName]
        if fieldValue
          if /\//.test(fieldValue)
            throw new Error("Octokat Error: this field must not contain slashes: #{fieldName}")
          param = "/#{fieldValue}"
      when '+'
        fieldName = match[2...match.length-1] # omit the braces and the `+`
        fieldValue = templateParams[fieldName]
        if fieldValue
          param = fieldValue
      when '?'
        # Strip off the "{?" and the trailing "}"
        # For example, the URL is `/assets{?name,label}`
        #   which turns into `/assets?name=foo.zip`
        # Used to upload releases via the repo releases API.
        #
        # When match contains `,` or
        # `args.length is 1` and args[0] is object match the args to those in the template
        optionalNames = match[2..-2].split(',') # omit the braces and the `?` before splitting
        optionalParams = {}
        for fieldName in optionalNames
          optionalParams[fieldName] = templateParams[fieldName]
        param = toQueryString(optionalParams)
      when '&'
        optionalNames = match[2..-2].split(',') # omit the braces and the `?` before splitting
        optionalParams = {}
        for fieldName in optionalNames
          optionalParams[fieldName] = templateParams[fieldName]
        param = toQueryString(optionalParams, true) # true means omitQuestionMark

      else
        # This is a required field. ie `{repoName}`
        fieldName = match[1...match.length-1] # omit the braces
        if templateParams[fieldName]
          param = templateParams[fieldName]
        else
          throw new Error("Octokat Error: Required parameter is missing: #{fieldName}")

    url = url.replace(match, param)
    i++

  url
