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

module.exports = {newPromise, allPromises}
