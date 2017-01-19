const { filter, forOwn, extend } = require('./plus')

// When `origFn` is not passed a callback as the last argument then return a
// Promise, or error if no Promise can be found (see `plugins/promise/*` for
// some strategies for loading a Promise implementation)
let toPromise = (orig) =>
  function (...args) {
    let last = args[args.length - 1]
    if (typeof last === 'function') { // The last arg is a callback function
      args.pop()
      return orig(last, ...args)
    } else if (typeof Promise !== 'undefined') {
      return new Promise(function (resolve, reject) {
        let cb = function (err, val) {
          if (err) { return reject(err) }
          return resolve(val)
        }
        return orig(cb, ...args)
      })
    } else {
      throw new Error('You must specify a callback or have a promise library loaded')
    }
  }

class VerbMethods {
  constructor (plugins, _requester) {
    this._requester = _requester
    if (!this._requester) { throw new Error('Octokat BUG: request is required') }

    let promisePlugins = filter(plugins, ({promiseCreator}) => promiseCreator)
    if (promisePlugins) {
      this._promisePlugin = promisePlugins[0]
    }

    this._syncVerbs = {}
    let iterable = filter(plugins, ({verbs}) => verbs)
    for (let i = 0; i < iterable.length; i++) {
      let plugin = iterable[i]
      extend(this._syncVerbs, plugin.verbs)
    }
    this._asyncVerbs = {}
    let iterable1 = filter(plugins, ({asyncVerbs}) => asyncVerbs)
    for (let j = 0; j < iterable1.length; j++) {
      let plugin = iterable1[j]
      extend(this._asyncVerbs, plugin.asyncVerbs)
    }
  }

  // Injects verb methods onto `obj`
  injectVerbMethods (path, obj) {
    if (typeof obj === 'object' || typeof obj === 'function') {
      obj.url = path // Mostly for testing
      forOwn(this._syncVerbs, (verbFunc, verbName) => {
        obj[verbName] = (...args) => {
          let makeRequest = (cb, ...originalArgs) => {
            let data, method, options;
            ({method, path, data, options} = verbFunc(path, ...originalArgs))
            return this._requester.request(method, path, data, options, cb)
          }
          return toPromise(makeRequest)(...args)
        }
      }
      )

      forOwn(this._asyncVerbs, (verbFunc, verbName) => {
        obj[verbName] = (...args) => {
          let makeRequest = verbFunc(this._requester, path) // Curried function
          return toPromise(makeRequest)(...args)
        }
      }
      )
    } else {
      // console.warn('BUG: Attempted to injectVerbMethods on a ' + (typeof obj));
    }

    return obj
  }
}

export { VerbMethods, toPromise }
