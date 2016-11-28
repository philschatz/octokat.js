{expect} = require 'chai'
{client, LONG_TIMEOUT, test_repo, test_github_login} = require '../test-config'

describe 'Stats', () ->
  @timeout(LONG_TIMEOUT)

  it "returns contributors and their contribution stats", ->
    client.repos('octokit/octokit.rb').stats.contributors.fetch()

  it "returns the commit activity stats", ->
    client.repos('octokit/octokit.rb').stats.commitActivity.fetch()

  # Commented because it seems to always return a 403
  # it "returns the code frequency stats", ->
  #   client.repos(test_repo).stats.codeFrequency.fetch()
  #   .then () -> done()

  it "returns the owner and contributor participation stats", ->
    client.repos('octokit/octokit.rb').stats.participation.fetch()

  it "returns commit count by hour punch card stats", ->
    client.repos('octokit/octokit.rb').stats.punchCard.fetch()

  # TODO: There is a duplicate test here for pengwynn/pingwynn (and a few others)
