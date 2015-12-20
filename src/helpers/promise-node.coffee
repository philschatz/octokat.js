req = require # Hack so requireJS does not try to load `es6-promise` in the browser
# Use native promises if Harmony is on
Promise     = @Promise or req('es6-promise').Promise
newPromise  = (fn) -> return new Promise(fn)
allPromises = (promises) -> return Promise.all(promises)

module.exports = {newPromise, allPromises}
