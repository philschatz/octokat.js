const TREE_OPTIONS = require('./grammar/tree-options')
const plus = require('./plus')


const chained = (verbMethods, path, name, fn) => {

  fn = fn || ((...args) => {

    if (!args.length) { throw new Error('BUG! must be called with at least one argument') }
    // TODO: Validate the args (in DEBUG mode) using the `path` to look up

    const separator = name === 'compare' ? '...' : '/'
    const pathWithArgs = `${path}/${args.join(separator)}`
    return chained(verbMethods, pathWithArgs, '')
  })

  // inject the child options
  TREE_OPTIONS.forEach((name) => {
    Object.defineProperty(fn, plus.camelize(name), {
      configurable: true,
      enumerable: true,
      get: () => chained(verbMethods, `${path}/${name}`, name)
    })
  })

  // Inject the verb methods
  verbMethods.injectVerbMethods(path, fn)

  fn.__path = path

  return fn
}


module.exports = chained
