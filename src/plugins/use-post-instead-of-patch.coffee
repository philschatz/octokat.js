module.exports = new class UsePostInsteadOfPatch
  requestMiddlewareAsync: (input, cb) ->
    {clientOptions:{usePostInsteadOfPatch}, method} = input
    if usePostInsteadOfPatch and method is 'PATCH'
      input.method = 'POST'
    cb(null, input)
