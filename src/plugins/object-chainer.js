const OBJECT_MATCHER = require('../grammar/object-matcher')
const TREE_OPTIONS = require('../grammar/tree-options')

const { VerbMethods } = require('../verb-methods')
const Chainer = require('../chainer')

module.exports = new class ObjectChainer {
  chainChildren (chainer, url, obj) {
    return (() => {
      let result = []
      for (let key in OBJECT_MATCHER) {
        let re = OBJECT_MATCHER[key]
        let item
        if (re.test(obj.url)) {
          let context = TREE_OPTIONS
          let iterable = key.split('.')
          for (let i = 0; i < iterable.length; i++) {
            var k = iterable[i]
            context = context[k]
          }
          item = chainer.chain(url, k, context, obj)
        }
        result.push(item)
      }
      return result
    })()
  }

  responseMiddlewareAsync (input, cb) {
    let {plugins, requester, data, url} = input
    // unless data
    //    throw new Error('BUG! Expected JSON data to exist')
    let verbMethods = new VerbMethods(plugins, requester)
    let chainer = new Chainer(verbMethods)
    if (url) {
      chainer.chain(url, true, {}, data)
      this.chainChildren(chainer, url, data)
    } else {
      chainer.chain('', null, {}, data)
      // For the paged results, rechain all children in the array
      if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
          let datum = data[i]
          this.chainChildren(chainer, datum.url, datum)
        }
      }
    }

    return cb(null, input)
  }
}()
