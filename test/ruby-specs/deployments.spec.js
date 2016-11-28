/* eslint-env mocha */
const { expect } = require('chai')
const { client, LONG_TIMEOUT, test_repo } = require('../test-config')

describe('Deployments', function () {
  return this.timeout(LONG_TIMEOUT)
})

  // it "lists deployments", (done) ->
  //   client.repos(test_repo).deployments.fetch()
  //   .then (deployments) ->
  //     expect(deployments).to.be.an.Array

  // TODO: Add, remove, check status of deployments
