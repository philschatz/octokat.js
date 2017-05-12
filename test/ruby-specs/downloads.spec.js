/* eslint-env mocha */
const { expect } = require('chai')
const { client, LONG_TIMEOUT } = require('../test-config')

describe('Downloads', function () {
  this.timeout(LONG_TIMEOUT)

  it('lists available downloads', () =>
    client.repos('github/hubot').downloads.fetch()
    .then(({items}) => expect(items[items.length - 1].description).to.equal('Version 1.0.0 of the Hubot Campfire Bot'))
  )

  it('gets a single download', () =>
    client.repos('github/hubot').downloads(165347).fetch()
    .then(download => expect(download.name).to.equal('hubot-2.1.0.tar.gz'))
  )
})
