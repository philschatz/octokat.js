module.exports =
  requestMiddleware: ({clientOptions:{usePostInsteadOfPatch}, method}) ->
    if usePostInsteadOfPatch and method is 'PATCH'
      {method: 'POST'}
