toQueryString = require './helper-querystring'

module.exports =
  verbs:
    fetch     : (path, query) -> {method:'GET', path:"#{path}#{toQueryString(query)}"}
    read      : (path, query) -> {method:'GET', path:"#{path}#{toQueryString(query)}", options:{isRaw:true}}
    remove    : (path, data) ->   {method:'DELETE', path, data, options:{isBoolean:true}}
    create    : (path, data, contentType) ->
      if contentType
        {method:'POST', path, data, options:{isRaw:true, contentType}}
      else
        {method:'POST', path, data}
    update    : (path, data) ->   {method:'PATCH', path, data}
    add       : (path, data) ->   {method:'PUT', path, data, options:{isBoolean:true}}
    contains  : (path, args...) -> {method:'GET', path:"#{path}/#{args.join('/')}", options:{isBoolean:true}}
