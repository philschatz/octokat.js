define = window?.define or (cb) -> cb ((dep) -> require(dep.replace('cs!', '')))
define (require) ->

  {expect} = require 'chai'
  {client, LONG_TIMEOUT, test_repo, test_github_login} = require 'cs!../test-config'

  if window?
    it 'is skipping status tests in the browser because of CORS', ->

  else

    describe 'Status', () ->
      @timeout(LONG_TIMEOUT)

      it "returns the current system status", ->
        client.status()

      it "returns the last human message", ->
        client.status.lastMessage()

      it "returns the most recent status messages", ->
        client.status.messages()
