/* eslint-env mocha */
const fetchVCR = require('fetch-vcr')
fetchVCR.configure({
  fixturePath: '../node_modules/octokat-fixtures/_fixtures',
  // headerBlacklist: ['authorization', 'user-agent']
})

require('./all')

describe('Root construction', () => {
  beforeEach(() => {
    window.Octokat.Fetch = fetchVCR
  })

  it('can be instantiated via window.Octokat', () => {
    var x = new window.Octokat()
    if (!x) {
      throw new Error('Octokat was not instantiated')
    }
  })

  it('supports a custom fetch function', (done) => {
    window.Octokat.Fetch = (url, opts) => {
      done()
      // Continue by using the VCR version of fetch
      return fetchVCR(url, opts)
    }
    const octo = new Octokat()
    octo.zen.read()
    .catch(done) // Propagate the error up
  })
})

mocha.checkLeaks()

mocha.run()
