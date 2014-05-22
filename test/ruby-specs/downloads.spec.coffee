define = window?.define or (cb) -> cb ((dep) -> require(dep.replace('cs!', '')))
define (require) ->

  {expect} = require 'chai'
  {client, LONG_TIMEOUT, test_repo} = require 'cs!../test-config'

  describe 'Downloads', () ->
    @timeout(LONG_TIMEOUT)

    it "lists available downloads", (done) ->
      client.repos("github/hubot").downloads.fetch()
      .then (downloads) ->
        expect(downloads[downloads.length-1].description).to.equal("Version 1.0.0 of the Hubot Campfire Bot")
        done()

    it "gets a single download", (done) ->
      client.repos("github/hubot").downloads(165347).fetch()
      .then (download) ->
        expect(download.name).to.equal("hubot-2.1.0.tar.gz")
        done()
