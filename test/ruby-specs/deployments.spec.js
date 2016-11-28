/* eslint-env mocha */
const { LONG_TIMEOUT } = require('../test-config')

describe('Deployments', function () {
  return this.timeout(LONG_TIMEOUT)
})

  // it "lists deployments", (done) ->
  //   client.repos(test_repo).deployments.fetch()
  //   .then (deployments) ->
  //     expect(deployments).to.be.an.Array

  // TODO: Add, remove, check status of deployments
