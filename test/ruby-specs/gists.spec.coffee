define = window?.define or (cb) -> cb ((dep) -> require(dep.replace('cs!', '')))
define (require) ->

  {expect} = require 'chai'
  {client, LONG_TIMEOUT, test_repo, test_github_login} = require 'cs!../test-config'

  describe 'Gists', () ->
    @timeout(LONG_TIMEOUT)

    before ->
      new_gist =
        description : "A gist from Octokit"
        public      : true
        files       :
          "zen.text":
            content : "Keep it logically awesome."

      client.gists.create(new_gist)
      .then (@gist) =>
        @gist.comments.create(body: ':metal:')
        .then (@gist_comment) =>


    it "creates a new gist", () ->
      expect(@gist.owner.login).to.equal(test_github_login)
      expect(@gist.files['zen.text']).to.be.ok

    it "creates a new gist comment", () ->
      expect(@gist_comment.user.login).to.equal(test_github_login)

    it "edit an existing gist", ->
      @gist.update({description: "GitHub Zen"})

    it "stars an existing gist", ->
      @gist.star.add()
      .then (flag) ->
        expect(flag).to.be.true

    it "unstars an existing gist", ->
      @gist.star.remove()
      .then (flag) ->
        expect(flag).to.be.true

    it "is not starred", ->
      @gist.star.contains()
      .then (flag) ->
        expect(flag).to.be.false

    it "forks an existing gist", ->
      client.gists('839d32ef87bc22ba5231').forks.create()
      .then (gist) =>
        gist.remove()

    it "returns the list of gist comments", ->
      @gist.comments.fetch()
      .then (comments) =>
        expect(comments).to.be.an.Array

    it "returns a gist comment", ->
      @gist.comments(@gist_comment.id).fetch()
      .then(null,(e) -> console.error e)

    it "updates a gist comment", ->
      @gist.comments(@gist_comment.id).update({body: ':heart:'})


    it "deletes a gist comment", ->
      @gist.comments(@gist_comment.id).remove()

    it "deletes a gist", ->
      @gist.remove()


    describe 'Unauthenticated Gists', () ->

      it "returns public gists", ->
        client.gists.public.fetch()
        .then (gists) ->
          expect(gists).to.be.an.Array

      # it "with username passed", ->
      #   client.users('defunkt').gists.fetch()
      #   # .then(null,(e) -> console.error e)
      #   .then (gists) ->
      #     expect(gists).to.be.an.Array

      it "without a username passed", ->
        client.gists.fetch()
        .then(null,(e) -> console.error e)
        .then (gists) ->
          expect(gists).to.be.an.Array

      it "returns the gist by ID", ->
        client.gists(790381).fetch()
        .then (gist) ->
          expect(gist.owner.login).to.equal('jmccartie')

      it "returns the user's starred gists", ->
        client.gists.starred.fetch()
        .then(null,(e) -> console.error e)
        .then (gists) ->
          expect(gists).to.be.an.Array
