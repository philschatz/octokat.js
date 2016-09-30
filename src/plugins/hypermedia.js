const deprecate = require('../deprecate')

module.exports = new class HyperMedia {
  replace (instance, data) {
    if (Array.isArray(data)) {
      return this._replaceArray(instance, data)
    } else if (typeof data === 'function') {
      return data
    } else if (data instanceof Date) {
      return data
    } else if (data === Object(data)) {
      return this._replaceObject(instance, data)
    } else {
      return data
    }
  }

  _replaceObject (instance, orig) {
    let acc = {}
    let iterable = Object.keys(orig)
    for (let i = 0; i < iterable.length; i++) {
      let key = iterable[i]
      let value = orig[key]
      this._replaceKeyValue(instance, acc, key, value)
    }

    return acc
  }

  _replaceArray (instance, orig) {
    let arr = (orig.map((item) => this.replace(instance, item)))
    // Convert the nextPage methods for paged results
    let iterable = Object.keys(orig)
    for (let i = 0; i < iterable.length; i++) {
      let key = iterable[i]
      let value = orig[key]
      this._replaceKeyValue(instance, arr, key, value)
    }
    return arr
  }

  // Convert things that end in `_url` to methods which return a Promise
  _replaceKeyValue (instance, acc, key, value) {
    if (/_url$/.test(key)) {
      if (/^upload_url$/.test(key)) {
        // POST https://<upload_url>/repos/:owner/:repo/releases/:id/assets?name=foo.zip
        var defaultFn = function (...args) {
          // TODO: Maybe always set isRaw=true when contentType is provided
          deprecate('call .upload({name, label}).create(data, contentType)' +
            ' instead of .upload(name, data, contentType)')
          return defaultFn.create(...args)
        }

        var fn = (...args) => instance._fromUrlWithDefault(value, defaultFn, ...args)()
      } else {
        var defaultFn = function () {
          deprecate('instead of directly calling methods like .nextPage(), use .nextPage.fetch()')
          return this.fetch()
        }
        var fn = instance._fromUrlCurried(value, defaultFn)
      }

      let newKey = key.substring(0, key.length - '_url'.length)
      acc[newKey] = fn
      // add a camelCase URL field for retrieving non-templated URLs
      // like `avatarUrl` and `htmlUrl`
      if (!/\{/.test(value)) {
        return acc[key] = value
      }
    } else if (/_at$/.test(key)) {
      // Ignore null dates so we do not get `Wed Dec 31 1969`
      return acc[key] = value ? new Date(value) : null
    } else {
      return acc[key] = this.replace(instance, value)
    }
  }

  responseMiddlewareAsync (input, cb) {
    let {instance, data} = input
    data = this.replace(instance, data)
    input.data = data // or throw new Error('BUG! Expected JSON data to exist')
    return cb(null, input)
  }
}()
