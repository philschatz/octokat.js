const OBJECT_MATCHER = require('../grammar/object-matcher')

const { VerbMethods } = require('../verb-methods')
const Chainer = require('../chained')

module.exports = new class ObjectChainer {
  chainChildren (url, obj) {
    for (let key in OBJECT_MATCHER) {
      let re = OBJECT_MATCHER[key]
      if (re.test(obj.url)) {
        Chainer(this._verbMethods, url, context, obj)
      }
    }
  }

  responseMiddlewareAsync (input) {
    let {plugins, requester, data, url} = input
    // unless data
    //    throw new Error('BUG! Expected JSON data to exist')
    this._verbMethods = new VerbMethods(plugins, requester)
    if (url) {
      Chainer(this._verbMethods, url, '', data)
      this.chainChildren(url, data)
    } else {
      Chainer(this._verbMethods, '', '', data)
      // For the paged results, rechain all children in the array
      if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
          let datum = data[i]
          this.chainChildren(datum.url, datum)
        }
      }
    }

    return Promise.resolve(input)
  }
}()
