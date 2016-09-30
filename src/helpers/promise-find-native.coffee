if Promise?
  newPromise = (fn) => return new Promise (resolve, reject) ->
    # Some browsers (like node-webkit 0.8.6) contain an older implementation
    # of Promises that provide 1 argument (a `PromiseResolver`).
    if resolve.fulfill
      fn(resolve.resolve.bind(resolve), resolve.reject.bind(resolve))
    else
      fn(arguments...)

  allPromises = (promises) => Promise.all(promises)

module.exports = {newPromise, allPromises}
