{newPromise, allPromises} = require '../../helpers/promise-find-library'
unless newPromise and allPromises
  {newPromise, allPromises} = require '../../helpers/promise-find-native'
unless window? or newPromise
  {newPromise, allPromises} = require '../../helpers/promise-node'

if window? and not newPromise
  # Otherwise, show a warning (library can still be used with just callbacks)
  console?.warn?('Octokat: A Promise API was not found. Supported libraries that have Promises are jQuery, angularjs, and es6-promise')

else if !window? and not newPromise
  # Running in NodeJS
  throw new Error('Could not find a promise lib for node. Seems like a bug')

module.exports = new class PreferLibraryOverNativePromises
  promiseCreator: {newPromise, allPromises}
