/* eslint-env mocha */

// require('./all')

describe('Root construction', () => {
  it('can be instantiated via window.Octokat', () => {
    var x = new window.Octokat()
    if (!x) {
      throw new Error('Octokat was not instantiated')
    }
  })
})

mocha.checkLeaks()

// Needs to run once this file is loaded
window.sepia.fixtureDir('node_modules/octokat-fixtures/fixtures')
window.sepia.start()

mocha.run()
