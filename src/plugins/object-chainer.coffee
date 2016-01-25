OBJECT_MATCHER = require '../grammar/object-matcher'
TREE_OPTIONS = require '../grammar/tree-options'

VerbMethods = require '../verb-methods'
Chainer = require '../chainer'

module.exports = new class ObjectChainer
  chainChildren: (chainer, url, obj) ->
    for key, re of OBJECT_MATCHER
      if re.test(obj.url)
        context = TREE_OPTIONS
        for k in key.split('.')
          context = context[k]
        chainer.chain(url, k, context, obj)

  responseMiddleware: ({plugins, requester, data, url}) ->
    verbMethods = new VerbMethods(plugins, requester)
    chainer = new Chainer(verbMethods)
    if url
      chainer.chain(url, true, {}, data)
      @chainChildren(chainer, url, data)
    else
      chainer.chain('', null, {}, data)
      # For the paged results, rechain all children in the array
      if Array.isArray(data)
        for datum in data
          @chainChildren(chainer, datum.url, datum)

    {data}
