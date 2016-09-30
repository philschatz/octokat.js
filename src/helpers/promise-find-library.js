if (typeof window !== 'undefined' && window !== null) {
  // Running in a browser

  // Determine the correct Promise factory.
  // Try to use libraries before native Promises since most Promise users
  // are already using a library.
  //
  // Try in the following order:
  // - Q Promise
  // - angularjs Promise
  // - jQuery Promise
  // - native Promise or a polyfill
  if (window.Q) {
    var newPromise = fn => {
      let deferred = window.Q.defer();
      let resolve = val => deferred.resolve(val);
      let reject  = err => deferred.reject(err);
      fn(resolve, reject);
      return deferred.promise;
    };
    var allPromises = promises => window.Q.all(promises);
  } else if (window.angular) {
    var newPromise = null;
    var allPromises = null;

    // Details on Angular Promises: http://docs.angularjs.org/api/ng/service/$q
    let injector = angular.injector(['ng']);
    injector.invoke(function($q) {
      newPromise = function(fn) {
        let deferred = $q.defer();
        let resolve = val => deferred.resolve(val);
        let reject  = err => deferred.reject(err);
        fn(resolve, reject);
        return deferred.promise;
      };
      return allPromises = promises => $q.all(promises);
    });
  } else if (__guard__(window.jQuery, x => x.Deferred)) {
    var newPromise = fn => {
      let promise = window.jQuery.Deferred();
      let resolve = val => promise.resolve(val);
      let reject  = val => promise.reject(val);
      fn(resolve, reject);
      return promise.promise();
    };
    var allPromises = promises => {
      // `jQuery.when` is a little odd.
      // - It accepts each promise as an argument (instead of an array of promises)
      // - Each resolved value is an argument (instead of an array of values)
      //
      // So, convert the array of promises to args and then the resolved args to an array
      return window.jQuery.when(...promises).then((...promises) => promises);
    };
  }
}

export { newPromise, allPromises };

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}