/* eslint-env mocha */
const { expect } = require('chai')
const { Octokat, TOKEN, REPO_USER, REPO_NAME } = require('./test-config')

describe('Event Emitter', () =>

  it('emits when a request begins and when it completes', function (done) {
    let emittedStart = false
    // emittedEnd = false
    let emitter = function (name, id, {method, path}, status, rate) {
      expect(method).to.equal('GET')
      expect(path).to.be.a('string')
      switch (name) {
        case 'start':
          emittedStart = true
          return emittedStart
        case 'end':
          expect(emittedStart).to.be.true
          expect(status).to.equal(200)
          expect(rate.remaining).to.be.gt(0)
          expect(rate.limit).to.be.gt(0)
          expect(rate.reset).to.be.gt(0)
          return done()
        default:
          return done(`Woah! odd event name ${name}`)
      }
    }

    let client = new Octokat({token: TOKEN, emitter})
    client.repos(REPO_USER, REPO_NAME).fetch().then(info => expect(info).to.not.be.null)

    // Mocha 3 does not like it when a promise is returned _and_ a done callback is expected
    return null
  })
)
