toQueryString = require '../helpers/querystring'

module.exports = new class ReadBinary
  verbs:
    readBinary: (path, query) -> {method:'GET', path:"#{path}#{toQueryString(query)}", options:{isRaw:true, isBase64:true}}

  requestMiddleware: ({options}) ->
    {isBase64} = options
    if isBase64
      return {
        headers: {Accept: 'application/vnd.github.raw'}
        mimeType: 'text/plain; charset=x-user-defined'
      }

  responseMiddleware: ({options, data}) ->
    {isBase64} = options
    # Convert the response to a Base64 encoded string
    if isBase64
      # Convert raw data to binary chopping off the higher-order bytes in each char.
      # Useful for Base64 encoding.
      converted = ''
      for i in [0...data.length]
        converted += String.fromCharCode(data.charCodeAt(i) & 0xff)

      {data:converted}
