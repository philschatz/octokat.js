# Promise Helper
# ===============================
#
# Provides a uniform Promise API using various Promise libs (if available).
#
# - `newPromise` : constructs a new Promise
# - `allPromises` : waits until all Promises have succeeded


if window?
  # Running in a browser

  # Determine the correct Promise factory.
  # Try to use libraries before native Promises since most Promise users
  # are already using a library.
  #
  # Try in the following order:
  # - Q Promise
  # - angularjs Promise
  # - jQuery Promise
  # - native Promise or a polyfill
  if window.Q
    newPromise = (fn) =>
      deferred = window.Q.defer()
      resolve = (val) -> deferred.resolve(val)
      reject  = (err) -> deferred.reject(err)
      fn(resolve, reject)
      return deferred.promise
    allPromises = (promises) -> window.Q.all(promises)
  else if window.angular
    newPromise = null
    allPromises = null

    # Details on Angular Promises: http://docs.angularjs.org/api/ng/service/$q
    injector = angular.injector(['ng'])
    injector.invoke ($q) ->
      newPromise = (fn) ->
        deferred = $q.defer()
        resolve = (val) -> deferred.resolve(val)
        reject  = (err) -> deferred.reject(err)
        fn(resolve, reject)
        return deferred.promise
      allPromises = (promises) -> $q.all(promises)
  else if window.jQuery?.Deferred
    newPromise = (fn) =>
      promise = window.jQuery.Deferred()
      resolve = (val) -> promise.resolve(val)
      reject  = (val) -> promise.reject(val)
      fn(resolve, reject)
      return promise.promise()
    allPromises = (promises) =>
      # `jQuery.when` is a little odd.
      # - It accepts each promise as an argument (instead of an array of promises)
      # - Each resolved value is an argument (instead of an array of values)
      #
      # So, convert the array of promises to args and then the resolved args to an array
      return window.jQuery.when(promises...).then((promises...) -> return promises)
  else if window.Promise
    newPromise = (fn) => return new window.Promise (resolve, reject) ->
      # Some browsers (like node-webkit 0.8.6) contain an older implementation
      # of Promises that provide 1 argument (a `PromiseResolver`).
      if resolve.fulfill
        fn(resolve.resolve.bind(resolve), resolve.reject.bind(resolve))
      else
        fn(arguments...)

    allPromises = (promises) => window.Promise.all(promises)

  else
    # Otherwise, show a warning (library can still be used with just callbacks)
    console?.warn?('Octokat: A Promise API was not found. Supported libraries that have Promises are jQuery, angularjs, and es6-promise')


else
  # Running in NodeJS

  req = require # Hack so requireJS does not try to load `es6-promise` in the browser
  # Use native promises if Harmony is on
  Promise     = @Promise or req('es6-promise').Promise
  newPromise  = (fn) -> return new Promise(fn)
  allPromises = (promises) -> return Promise.all(promises)



toPromise = (orig) ->
  return (args...) ->
    last = args[args.length - 1]
    if typeof last is 'function' # The last arg is a callback function
      args.pop()
      return orig(last, args...)
    else if newPromise
      return newPromise (resolve, reject) ->
        cb = (err, val) ->
          return reject(err) if err
          return resolve(val)
        orig(cb, args...)
    else
      throw new Error('You must specify a callback or have a promise library loaded')

module.exports = {newPromise, allPromises, toPromise}
