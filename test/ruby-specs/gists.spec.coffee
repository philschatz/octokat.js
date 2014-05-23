define = window?.define or (cb) -> cb ((dep) -> require(dep.replace('cs!', '')))
define (require) ->

  {expect} = require 'chai'
  {client, LONG_TIMEOUT, test_repo, test_github_login} = require 'cs!../test-config'

  describe 'Gists', () ->
    @timeout(LONG_TIMEOUT)

    before (done) ->
      new_gist =
        description : "A gist from Octokit"
        public      : true
        files       :
          "zen.text":
            content : "Keep it logically awesome."

      client.gists.create(new_gist)
      .then (@gist) =>
        @gist.comments.create(body: ':metal:')
        .then (@gist_comment) => done()


    it "creates a new gist", () ->
      expect(@gist.owner.login).to.equal(test_github_login)
      expect(@gist.files['zen.text']).to.be.ok

    it "creates a new gist comment", () ->
      expect(@gist_comment.user.login).to.equal(test_github_login)

    it "edit an existing gist", (done) ->
      @gist.update({description: "GitHub Zen"})
      .then () -> done()

    it "stars an existing gist", (done) ->
      @gist.star.add()
      .then (flag) ->
        expect(flag).to.be.true
        done()

    it "unstars an existing gist", (done) ->
      @gist.star.remove()
      .then (flag) ->
        expect(flag).to.be.true
        done()

    it "is not starred", (done) ->
      @gist.star.contains()
      .then (flag) ->
        expect(flag).to.be.false
        done()

    it "forks an existing gist", (done) ->
      client.gists('839d32ef87bc22ba5231').forks.create()
      .then (gist) =>
        gist.remove()
        .then () -> done()

    it "returns the list of gist comments", (done) ->
      @gist.comments.fetch()
      .then (comments) =>
        expect(comments).to.be.an.Array
        done()

    it "returns a gist comment", (done) ->
      @gist.comments(@gist_comment.id).fetch()
      .then(null,(e) -> console.error e)
      .then () -> done()

    it "updates a gist comment", (done) ->
      @gist.comments(@gist_comment.id).update({body: ':heart:'})
      .then () -> done()


    it "deletes a gist comment", (done) ->
      @gist.comments(@gist_comment.id).remove()
      .then () -> done()

    it "deletes a gist", (done) ->
      @gist.remove()
      .then () -> done()


    describe 'Unauthenticated Gists', () ->

      it "returns public gists", (done) ->
        client.gists.public.fetch()
        .then (gists) ->
          expect(gists).to.be.an.Array
          done()

      # it "with username passed", (done) ->
      #   client.users('defunkt').gists.fetch()
      #   # .then(null,(e) -> console.error e)
      #   .then (gists) ->
      #     expect(gists).to.be.an.Array
      #     done()

      it "without a username passed", (done) ->
        client.gists.fetch()
        .then(null,(e) -> console.error e)
        .then (gists) ->
          expect(gists).to.be.an.Array
          done()

      it "returns the gist by ID", (done) ->
        client.gists(790381).fetch()
        .then (gist) ->
          expect(gist.owner.login).to.equal('jmccartie')
          done()

      it "returns the user's starred gists", (done) ->
        client.gists.starred.fetch()
        .then(null,(e) -> console.error e)
        .then (gists) ->
          expect(gists).to.be.an.Array
          done()

