define = window?.define or (cb) -> cb ((dep) -> require(dep.replace('cs!', '')))
define (require) ->

  {expect} = require 'chai'
  {client, LONG_TIMEOUT, test_repo, test_github_login} = require 'cs!../test-config'

  describe 'Commit Comments', () ->
    @timeout(LONG_TIMEOUT)

    it 'returns a list of all commit comments', (done) ->
      client.repos("sferik/rails_admin").comments.fetch()
      .then (commit_comments) ->
        done()

    it "returns a list of comments for a specific commit", (done) ->
      client.repos("sferik/rails_admin").commits("629e9fd9d4df25528e84d31afdc8ebeb0f56fbb3").comments.fetch()
      .then (commit_comments) ->
        expect(commit_comments[0].user.login).to.equal("bbenezech")
        done()

    it "returns a single commit comment", (done) ->
      client.repos("sferik/rails_admin").comments("861907").fetch()
      .then (commit) ->
        expect(commit.user.login).to.equal("bbenezech")
        done()

    context "with commit comment", () ->
      before (done) ->
        client.repos(test_repo).commits.fetch()
        .then (commits) =>
          @commit = commits[0]
          client.repos(test_repo).commits(@commit.sha).comments.create({body:":metal:\n:sparkles:\n:cake:"})
          .then (@commit_comment) =>
            done()

      after (done) ->
        @commit_comment.remove().then () -> done()

      it "creates a commit comment", () ->
        expect(@commit_comment.user.login).to.equal(test_github_login)

      it "updates a commit comment", (done) ->
        @commit_comment.update({body:":penguin:"})
        .then(null, (err) -> console.error(err))
        .then (updated_comment) ->
          expect(updated_comment.body).to.equal(":penguin:")
          done()

      it "deletes a commit comment", (done) ->
        @commit_comment.remove()
        .then (result) ->
          expect(result).to.equal(true)
          done()
