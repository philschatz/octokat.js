module.exports = new class UsePostInsteadOfPatch
  requestMiddleware: ({clientOptions:{usePostInsteadOfPatch}, method}) ->
    if usePostInsteadOfPatch and method is 'PATCH'
      {method: 'POST'}
