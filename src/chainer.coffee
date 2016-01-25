plus = require './plus'

# Daisy-Chainer
# ===============================
#
# Generates the functions so `octo.repos(...).issues.comments.fetch()` works.
# Constructs a URL for the verb methods (like `.fetch` and `.create`).

module.exports = class Chainer
  constructor: (@_verbMethods) ->

  chain: (path, name, contextTree, fn) ->
    fn ?= (args...) =>
      throw new Error('BUG! must be called with at least one argument') unless args.length
      # Special-case compare because its args turn into '...' instead of the usual '/'
      if name is 'compare'
        separator = '...'
      else
        separator = '/'
      return @chain("#{path}/#{args.join(separator)}", name, contextTree)

    @_verbMethods.injectVerbMethods(path, fn)

    if typeof fn is 'function' or typeof fn is 'object'
      for name of contextTree or {}
        do (name) =>
          # Delete the key if it already exists
          delete fn[plus.camelize(name)]

          Object.defineProperty fn, plus.camelize(name),
            configurable: true
            enumerable: true
            get: => @chain("#{path}/#{name}", name, contextTree[name])


    return fn

module.exports = Chainer
