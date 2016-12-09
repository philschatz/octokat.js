let { newPromise, allPromises } = require('../../helpers/promise-find-library')

if (!newPromise || !allPromises) {
  ({newPromise, allPromises} = require('../../helpers/promise-find-native'))
}
if ((typeof window === 'undefined' || window === null) && !newPromise) {
  ({newPromise, allPromises} = require('../../helpers/promise-node'))
}

if ((typeof window !== 'undefined' && window !== null) && !newPromise) {
  // Otherwise, show a warning (library can still be used with just callbacks)
  if (window.console && window.console.warn) {
     window.console.warn('Octokat: A Promise API was not found. Supported libraries that have Promises are jQuery, angularjs, and es6-promise')
  }
} else if ((typeof window === 'undefined' || window === null) && !newPromise) {
  // Running in NodeJS
  throw new Error('Could not find a promise lib for node. Seems like a bug')
}

// new class PreferLibraryOverNativePromises
module.exports = {
  promiseCreator: {newPromise, allPromises}
}
