define = window?.define or (cb) -> cb ((dep) -> require(dep.replace('cs!', '')))
define (require) ->

  {expect} = require 'chai'
  {client, LONG_TIMEOUT, test_repo, test_github_login} = require 'cs!../test-config'

  describe 'Stats', () ->
    @timeout(LONG_TIMEOUT)

    it "returns contributors and their contribution stats", (done) ->
      client.repos('octokit/octokit.rb').stats.contributors.fetch()
      .then () -> done()

    it "returns the commit activity stats", (done) ->
      client.repos('octokit/octokit.rb').stats.commitActivity.fetch()
      .then () -> done()

    # Commented because it seems to always return a 403
    # it "returns the code frequency stats", (done) ->
    #   client.repos(test_repo).stats.codeFrequency.fetch()
    #   .then () -> done()

    it "returns the owner and contributor participation stats", (done) ->
      client.repos('octokit/octokit.rb').stats.participation.fetch()
      .then () -> done()

    it "returns commit count by hour punch card stats", (done) ->
      client.repos('octokit/octokit.rb').stats.punchCard.fetch()
      .then () -> done()

    # TODO: There is a duplicate test here for pengwynn/pingwynn (and a few others)
