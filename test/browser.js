/* eslint-env mocha */
require('fetch-vcr').configure({
  fixturePath: '../node_modules/octokat-fixtures/_fixtures',
  // headerBlacklist: ['authorization', 'user-agent']
})

require('./all')

describe('Root construction', () => {
  it('can be instantiated via window.Octokat', () => {
    var x = new window.Octokat()
    if (!x) {
      throw new Error('Octokat was not instantiated')
    }
  })
})

mocha.checkLeaks()

mocha.run()
