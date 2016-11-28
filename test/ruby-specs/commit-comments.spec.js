/* eslint-env mocha */
const { expect } = require('chai')
const { client, LONG_TIMEOUT, test_repo, test_github_login } = require('../test-config')

describe('Commit Comments', function () {
  this.timeout(LONG_TIMEOUT)

  it('returns a list of all commit comments', () => client.repos('sferik/rails_admin').comments.fetch())

  it('returns a list of comments for a specific commit', () =>
    client.repos('sferik/rails_admin').commits('629e9fd9d4df25528e84d31afdc8ebeb0f56fbb3').comments.fetch()
    .then(({items}) => expect(items[0].user.login).to.equal('bbenezech'))
  )

  it('returns a single commit comment', () =>
    client.repos('sferik/rails_admin').comments('861907').fetch()
    .then(commit => expect(commit.user.login).to.equal('bbenezech'))
  )

  return context('with commit comment', function () {
    before(() =>
      client.repos(test_repo).commits.fetch()
      .then(({items}) => {
        this.commit = items[0]
        return client.repos(test_repo).commits(this.commit.sha).comments.create({body: ':metal:\n:sparkles:\n:cake:'})
        .then(commitComment => {
          this.commit_comment = commitComment
        })
      }
      )
    )

    after(() => {
      return this.commit_comment.remove()
    })

    it('creates a commit comment', () => {
      return expect(this.commit_comment.user.login).to.equal(test_github_login)
    })

    it('updates a commit comment', () => {
      return this.commit_comment.update({body: ':penguin:'})
      .then(null, err => console.error(err))
      .then(updatedComment => expect(updatedComment.body).to.equal(':penguin:'))
    })

    return it('deletes a commit comment', () => {
      return this.commit_comment.remove()
      .then(result => expect(result).to.equal(true))
    })
  })
})
