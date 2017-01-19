/* eslint-env mocha */
require('./all')

mocha.checkLeaks()

// Needs to run once this file is loaded
window.sepia.fixtureDir('node_modules/octokat-fixtures/fixtures')
window.sepia.start()

if (window.mochaPhantomJS) {
  window.mochaPhantomJS.run()
} else {
  mocha.run()
}
