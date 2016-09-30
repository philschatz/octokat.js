const plus = require('../plus')

module.exports = new class CamelCase {

  responseMiddlewareAsync (input, cb) {
    let {data} = input
    data = this.replace(data)
    input.data = data // or throw new Error('BUG! Expected JSON data to exist')
    return cb(null, input)
  }

  replace (data) {
    if (Array.isArray(data)) {
      return this._replaceArray(data)
    } else if (typeof data === 'function') {
      return data
    } else if (data instanceof Date) {
      return data
    } else if (data === Object(data)) {
      return this._replaceObject(data)
    } else {
      return data
    }
  }

  _replaceObject (orig) {
    let acc = {}
    let iterable = Object.keys(orig)
    for (let i = 0; i < iterable.length; i++) {
      let key = iterable[i]
      let value = orig[key]
      this._replaceKeyValue(acc, key, value)
    }

    return acc
  }

  _replaceArray (orig) {
    let arr = (orig.map((item) => this.replace(item)))
    // Convert the nextPage methods for paged results
    let iterable = Object.keys(orig)
    for (let i = 0; i < iterable.length; i++) {
      let key = iterable[i]
      let value = orig[key]
      this._replaceKeyValue(arr, key, value)
    }
    return arr
  }

  // Convert things that end in `_url` to methods which return a Promise
  _replaceKeyValue (acc, key, value) {
    return acc[plus.camelize(key)] = this.replace(value)
  }
}()
