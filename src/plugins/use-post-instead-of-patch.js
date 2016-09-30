module.exports = new class UsePostInsteadOfPatch {
  requestMiddlewareAsync (input, cb) {
    let {clientOptions: {usePostInsteadOfPatch}, method} = input
    if (usePostInsteadOfPatch && method === 'PATCH') {
      input.method = 'POST'
    }
    return cb(null, input)
  }
}()
