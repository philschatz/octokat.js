define = window?.define or (cb) -> cb ((dep) -> require(dep.replace('cs!', '')))
define (require) ->

  {expect} = require 'chai'
  {client, LONG_TIMEOUT, test_repo} = require 'cs!../test-config'

  describe 'Commits', () ->
    @timeout(LONG_TIMEOUT)

    it "returns all commits", (done) ->
      client.repos("sferik/rails_admin").commits.fetch()
      .then (commits) ->
        expect(commits[0].author).to.be.ok
        done()

    # it "handles branch or sha argument", (done) ->
    it "handles the sha option", (done) ->
      client.repos("sferik/rails_admin").commits.fetch({sha:"master"})
      .then () ->
        done()

    it "returns all commits on the specified date", (done) ->
      client.repos("sferik/rails_admin").commits.fetch({since:"2011-01-20"})
      .then (commits) ->
        expect(commits).to.be.an.Array
        done()


    it "returns a commit", (done) ->
      client.repos("sferik/rails_admin").commits("3cdfabd973bc3caac209cba903cfdb3bf6636bcd").fetch()
      .then (commit) ->
        expect(commit.author.login).to.equal('caboteria')
        done()

    it "returns a detailed git commit", (done) ->
      client.repos("octokit/octokit.rb").git.commits("2bfca14ed8ebc3dad75082ff175e6703aed7ccc0").fetch()
      .then (commit) ->
        expect(commit.author.name).to.equal('Joey Wendt')
        done()

    it "creates a commit", (done) ->
      client.repos(test_repo).commits.fetch()
      .then (commits) ->
        last_commit = commits[commits.length-1]

        client.repos(test_repo).git.commits.create({message: "My commit message", tree:last_commit.commit.tree.sha, parents:[last_commit.sha]})
        .then () -> done()


    it "merges a branch into another", (done) ->
      afterRemove = () ->
        repo = client.repos(test_repo)
        repo.commits.fetch()
        .then (commits) ->
          last_commit = commits[commits.length-1]
          repo.git.refs.create({ref:"refs/heads/branch-to-merge", sha:last_commit.sha})
          .then (v) ->
            head = 'master'
            base = 'branch-to-merge'
            commitMessage = "Testing the merge API"
            client.repos(test_repo).merges.create({base, head, commitMessage})
            .then () -> done()

      client.repos(test_repo).git.refs.heads('branch-to-merge').remove()
      .then(afterRemove, afterRemove)

    it "returns a comparison", (done) ->
      client.repos("gvaughn/octokit").compare('0e0d7ae299514da692eb1cab741562c253d44188', 'b7b37f75a80b8e84061cd45b246232ad958158f5').fetch()
      .then (comparison) ->
        expect(comparison.baseCommit.sha).to.equal('0e0d7ae299514da692eb1cab741562c253d44188')
        expect(comparison.mergeBaseCommit.sha).to.equal('b7b37f75a80b8e84061cd45b246232ad958158f5')
        done()

