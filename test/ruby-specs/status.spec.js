/* eslint-env mocha */
const { client, LONG_TIMEOUT } = require('../test-config')

if (typeof window !== 'undefined' && window !== null) {
  it('is skipping status tests in the browser because of CORS', function () {})
} else {
  describe('Status', function () {
    this.timeout(LONG_TIMEOUT)

    it('returns the current system status', () => client.status())

    it('returns the last human message', () => client.status.lastMessage())

    it('returns the most recent status messages', () => client.status.messages())
  })
}
