// Use native promises if Harmony is on
let Promise = this.Promise || require('./promise-node')
let newPromise = fn => new Promise(fn)
let allPromises = promises => Promise.all(promises)

module.exports = { newPromise, allPromises }
