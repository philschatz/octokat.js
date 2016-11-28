/* eslint-env mocha */
const { client, LONG_TIMEOUT } = require('../test-config')

describe('Stats', function () {
  this.timeout(LONG_TIMEOUT)

  it('returns contributors and their contribution stats', () => client.repos('octokit/octokit.rb').stats.contributors.fetch())

  it('returns the commit activity stats', () => client.repos('octokit/octokit.rb').stats.commitActivity.fetch())

  // Commented because it seems to always return a 403
  // it "returns the code frequency stats", ->
  //   client.repos(test_repo).stats.codeFrequency.fetch()
  //   .then () -> done()

  it('returns the owner and contributor participation stats', () => client.repos('octokit/octokit.rb').stats.participation.fetch())

  return it('returns commit count by hour punch card stats', () => client.repos('octokit/octokit.rb').stats.punchCard.fetch())
})

  // TODO: There is a duplicate test here for pengwynn/pingwynn (and a few others)
