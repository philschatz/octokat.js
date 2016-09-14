define = window?.define or (cb) -> cb ((dep) -> require(dep.replace('cs!', '')))
define (require) ->

  {expect} = require 'chai'
  {client, LONG_TIMEOUT, test_repo} = require 'cs!../test-config'

  btoa = @btoa or (str) ->
    buffer = new @Buffer(str, 'binary')
    return buffer.toString('base64')

  describe 'Contents', () ->
    @timeout(LONG_TIMEOUT)

    it "returns the default readme", ->
      client.repos('octokit/octokit.rb').readme.read()
      .then (readme) ->
        # expect(readme.encoding).to.equal("base64")
        # expect(readme.type).to.equal("file")

    it "returns the contents of a file", ->
      client.repos('octokit/octokit.rb').contents("lib/octokit.rb").read()
      .then (contents) ->
        # expect(contents.encoding).to.equal("base64")
        # expect(contents.type).to.equal("file")

    # it "returns the headers of the request", ->
    #   client.repos('octokit/octokit.rb').tarball('master').fetch()
    #   .then(null, (err) -> console.log err)
    #   .then (archive_link) ->
    #     expect(archive_link).to.equal('https://codeload.github.com/octokit/octokit.rb/legacy.tar.gz/master')

    context 'With a file', () ->
      before (done) ->
        removeFile = (content) ->
          console.log 'removing file'
          config =
            sha: content.sha
            message: 'Removing as prep for testing'
          client.repos(test_repo).contents("test_create.txt").remove(config)
          done()

        # If the file exists, remove it. Otherwise, done.
        client.repos(test_repo).contents("test_create.txt").fetch()
        .then(removeFile, (err) -> done())

        # In Mocha 3, if the returned value is a promise then it will complain that
        # we have specified a done() callback _and_ returned a promise.
        # So, since this test should always succeed even if there is no file (to delete)
        # just return null so Mocha does not complain.
        return null

      it "creates repository contents at a path", ->
        config =
          message: "I am commit-ing"
          content: btoa("Here be the content\n")
        client.repos(test_repo).contents("test_create.txt").add(config)
        .then(null, (err) -> console.log(err); throw new Error(err))
        .then (response) =>
          @content = response
          expect(@content.commit.sha).to.match(/[a-z0-9]{40}/)

      it "updates repository contents at a path", ->
        config =
          sha: @content.content.sha
          message: "I am commit-ing"
          content: btoa("Here be moar content")
        client.repos(test_repo).contents("test_create.txt").add(config)
        .then (response) =>
          @updated_content = response
          expect(response.commit.sha).to.match(/[a-z0-9]{40}/)

      it "deletes repository contents at a path", ->
        config =
          sha: @updated_content.content.sha
          message: "I am rm-ing"
        client.repos(test_repo).contents("test_create.txt").remove(config)
        .then (response) ->
          # TODO: have a non-boolean form of remove()
          # expect(response.commit.sha).to match(/[a-z0-9]{40}/)
