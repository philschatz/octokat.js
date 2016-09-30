let req = require // Hack so requireJS does not try to load `es6-promise` in the browser
// Use native promises if Harmony is on
let Promise = this.Promise || req('es6-promise').Promise
let newPromise = fn => new Promise(fn)
let allPromises = promises => Promise.all(promises)

export { newPromise, allPromises }
