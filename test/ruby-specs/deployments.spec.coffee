define = window?.define or (cb) -> cb ((dep) -> require(dep.replace('cs!', '')))
define (require) ->

  {expect} = require 'chai'
  {client, LONG_TIMEOUT, test_repo} = require 'cs!../test-config'

  describe 'Deployments', () ->
    @timeout(LONG_TIMEOUT)


    # it "lists deployments", (done) ->
    #   client.repos(test_repo).deployments.fetch()
    #   .then (deployments) ->
    #     expect(deployments).to.be.an.Array


    # TODO: Add, remove, check status of deployments
