/* eslint-env mocha */
const { expect } = require('chai')
const { client, LONG_TIMEOUT, test_repo } = require('../test-config')

if (typeof window !== 'undefined' && window !== null) {
  it('is skipping status tests in the browser because of CORS', function () {})
} else {
  describe('Status', function () {
    this.timeout(LONG_TIMEOUT)

    it('returns the current system status', () => client.status())

    it('returns the last human message', () => client.status.lastMessage())

    return it('returns the most recent status messages', () => client.status.messages())
  })
}
