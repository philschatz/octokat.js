/* eslint-env mocha */
const { expect } = require('chai')
const { client, LONG_TIMEOUT, test_github_login } = require('../test-config')

describe('Gists', function () {
  this.timeout(LONG_TIMEOUT)


  describe('Authenticated Gists', function () {
    before(function () {
      let newGist = {
        description: 'A gist from Octokat',
        public: true,
        files: {
          'zen.text': {
            content: 'Keep it logically awesome.'
          }
        }
      }

      return client.gists.create(newGist)
      .then(gist => {
        this.gist_val = gist
        this.gist_fn = client.fromUrl(gist.url)
        return this.gist_fn.comments.create({body: ':metal:'})
        .then(gistComment => {
          this.gist_comment_val = gistComment
        })
      }
      )
    })

    after(function () {
      delete this.gist_fn // needed for PhantomJS. Otherwise it hangs
    })

    it('creates a new gist', function () {
      expect(this.gist_val.url).to.be.a('string')
      return expect(this.gist_val.files['zen.text']).to.be.ok
    })

    it('creates a new gist comment', function () {
      return expect(this.gist_comment_val.url).to.be.a('string')
    })

    it('edit an existing gist', function () {
      return this.gist_fn.update({description: 'GitHub Zen'})
    })

    it('stars an existing gist', function () {
      return this.gist_fn.star.add()
      .then(flag => expect(flag).to.be.true)
    })

    it('unstars an existing gist', function () {
      return this.gist_fn.star.remove()
      .then(flag => expect(flag).to.be.true)
    })

    it('is not starred', function () {
      return this.gist_fn.star.contains()
      .then(flag => expect(flag).to.be.false)
    })

    it.skip('forks an existing gist', () =>
      client.gists('839d32ef87bc22ba5231').forks.create()
      .then(gist => {
        gist_fn = client.fromUrl(gist.url)
        return gist_fn.remove()
      }
      )
    )

    it('returns the list of gist comments', function () {
      return this.gist_fn.comments.fetch()
      .then(comments => {
        return expect(comments).to.be.an.Array
      }
      )
    })

    it('returns a gist comment', function () {
      return this.gist_fn.comments(this.gist_comment_val.id).fetch()
      .then(null, e => console.error(e))
    })

    it('updates a gist comment', function () {
      return this.gist_fn.comments(this.gist_comment_val.id).update({body: ':heart:'})
    })

    it('deletes a gist comment', function () {
      return this.gist_fn.comments(this.gist_comment_val.id).remove()
    })

    it('deletes a gist', function () {
      return this.gist_fn.remove()
    })
  })

  describe('Unauthenticated Gists', function () {
    it('returns public gists', () =>
      client.gists.public.fetch()
      .then(gists => expect(gists).to.be.an.Array)
    )

    // it "with username passed", ->
    //   client.users('defunkt').gists.fetch()
    //   # .then(null,(e) -> console.error e)
    //   .then (gists) ->
    //     expect(gists).to.be.an.Array

    it('without a username passed', () =>
      client.gists.fetch()
      .then(null, e => console.error(e))
      .then(gists => expect(gists).to.be.an.Array)
    )

    it('returns the gist by ID', () =>
      client.gists(790381).fetch()
      .then(gist => expect(gist.owner.login).to.equal('jmccartie'))
    )

    it("returns the user's starred gists", () =>
      client.gists.starred.fetch()
      .then(null, e => console.error(e))
      .then(gists => expect(gists).to.be.an.Array)
    )
  })
})
