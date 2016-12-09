if (typeof Promise !== 'undefined' && Promise !== null) {
  var newPromise = fn => { return new Promise(function (resolve, reject) {
    // Some browsers (like node-webkit 0.8.6) contain an older implementation
    // of Promises that provide 1 argument (a `PromiseResolver`).
    if (resolve.fulfill) {
      return fn(resolve.resolve.bind(resolve), resolve.reject.bind(resolve))
    } else {
      return fn(...arguments)
    }
  }) }

  var allPromises = promises => Promise.all(promises)
}

export { newPromise, allPromises }
