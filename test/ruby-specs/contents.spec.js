/* eslint-env mocha */
const { expect } = require('chai')
const { client, LONG_TIMEOUT, test_repo } = require('../test-config')

// NodeJS does not have a btoa
let btoa = null

if (typeof window !== 'undefined' && window !== null) {
  btoa = window.btoa
  // Use the `Buffer` if available (NodeJS)
} else if (typeof global !== 'undefined' && global !== null) {
  btoa = function (str) {
    var buffer = new global['Buffer'](str, 'binary')
    return buffer.toString('base64')
  }
} else {
  throw new Error('Native btoa function or Buffer is missing')
}

describe('Contents', function () {
  this.timeout(LONG_TIMEOUT)

  it('returns the default readme', () =>
    client.repos('octokit/octokit.rb').readme.read()
    .then(function (readme) {})
  )
      // expect(readme.encoding).to.equal("base64")
      // expect(readme.type).to.equal("file")

  it('returns the contents of a file', () =>
    client.repos('octokit/octokit.rb').contents('lib/octokit.rb').read()
    .then(function (contents) {})
  )
      // expect(contents.encoding).to.equal("base64")
      // expect(contents.type).to.equal("file")

  // it "returns the headers of the request", ->
  //   client.repos('octokit/octokit.rb').tarball('master').fetch()
  //   .then(null, (err) -> console.log err)
  //   .then (archive_link) ->
  //     expect(archive_link).to.equal('https://codeload.github.com/octokit/octokit.rb/legacy.tar.gz/master')

  context('With a file', function () {
    beforeEach(function (done) {
      let removeFile = function (octoPartial, content) {
        let config = {
          sha: content.sha,
          message: 'Removing as prep for testing'
        }
        return octoPartial.remove(config)
      }

      // If the file exists, remove it. Otherwise, done.
      function removeFirst(content1) {
        function removeSecond () {
          const octoPartial2 = client.repos(test_repo).contents('test_delete.txt')
          octoPartial2.fetch()
          /* eslint handle-callback-err: "off" */
          .then(content => {
            removeFile(octoPartial2, content)
            .then(x => done())
          }, err => done())
        }
        removeFile(octoPartial, content1)
        .then(removeSecond, removeSecond)
      }
      let octoPartial = client.repos(test_repo).contents('test_create.txt')
      octoPartial.fetch()
      /* eslint handle-callback-err: "off" */
      .then(removeFirst, removeFirst)


      // In Mocha 3, if the returned value is a promise then it will complain that
      // we have specified a done() callback _and_ returned a promise.
      // So, since this test should always succeed even if there is no file (to delete)
      // just return null so Mocha does not complain.
      return null
    })

    it('creates repository contents at a path', () => {
      const repo = client.repos(test_repo)
      return repo.fetch().then(({defaultBranch}) => {
        return repo.branches(defaultBranch).fetch().then(({commit}) => {
          let config = {
            message: 'I am commit-ing',
            content: btoa('Here be the content\n')
          }
          return repo.contents('test_create.txt').add(config)
          .then(null, function (err) { console.log(err); throw new Error(err) })
          .then(response => {
            return expect(response.commit.sha).to.match(/[a-z0-9]{40}/)
          })
        })
      })
    })

    it('updates repository contents at a path', () => {
      // Prep work (from previous test)
      const repo = client.repos(test_repo)
      return repo.fetch().then(({defaultBranch}) => {
        return repo.branches(defaultBranch).fetch().then(({commit}) => {
          let config = {
            message: 'I am commit-ing',
            content: btoa('Here be the content\n')
          }
          return repo.contents('test_create.txt').add(config)
          .then(null, function (err) { console.log(err); throw new Error(err) })
          .then(response => {

            // Test Start
            let config = {
              sha: response.content.sha,
              message: 'I am commit-ing',
              content: btoa('Here be moar content')
            }
            return client.repos(test_repo).contents('test_create.txt').add(config)
            .then(response2 => {
              return expect(response2.commit.sha).to.match(/[a-z0-9]{40}/)
            })
          })
        })
      })
    })

    it('deletes repository contents at a path', () => {
      // Prep work (from previous test)
      const repo = client.repos(test_repo)
      return repo.fetch().then(({defaultBranch}) => {
        return repo.branches(defaultBranch).fetch().then(({commit}) => {
          let config = {
            message: 'I am commit-ing for removal',
            content: btoa('Here be the content\n')
          }
          return repo.contents('test_delete.txt').add(config)
          .then(null, function (err) { console.log(err); throw new Error(err) })
          .then(response => {
            expect(response.commit.sha).to.match(/[a-z0-9]{40}/)

            // Test Start
            let config = {
              sha: response.content.sha,
              message: 'I am rm-ing'
            }
            return client.repos(test_repo).contents('test_delete.txt').remove(config)
            .then(function (response) {
              expect(response.url).is.a('string')
            })
          })
        })
      })
    })
  })
})

// TODO: have a non-boolean form of remove()
// expect(response.commit.sha).to match(/[a-z0-9]{40}/)
