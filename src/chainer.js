const plus = require('./plus')

// Daisy-Chainer
// ===============================
//
// Generates the functions so `octo.repos(...).issues.comments.fetch()` works.
// Constructs a URL for the verb methods (like `.fetch` and `.create`).

module.exports = class Chainer {
  constructor (_verbMethods) {
    this._verbMethods = _verbMethods
  }

  chain (path, name, contextTree, fn) {
    if (typeof fn === 'undefined' || fn === null) {
      fn = (...args) => {
        if (!args.length) { throw new Error('BUG! must be called with at least one argument') }
        let separator = '/'
        // Special-case compare because its args turn into '...' instead of the usual '/'
        if (name === 'compare') {
          separator = '...'
        }
        return this.chain(`${path}/${args.join(separator)}`, name, contextTree)
      }
    }

    this._verbMethods.injectVerbMethods(path, fn)

    if (typeof fn === 'function' || typeof fn === 'object') {
      for (name in contextTree || {}) {
        (name => {
          // Delete the key if it already exists
          delete fn[plus.camelize(name)]

          return Object.defineProperty(fn, plus.camelize(name), {
            configurable: true,
            enumerable: true,
            get: () => this.chain(`${path}/${name}`, name, contextTree[name])
          }
          )
        })(name)
      }
    }

    return fn
  }
}
