/* eslint-env mocha */
const { expect } = require('chai')
const { client, REPO_USER, REPO_NAME } = require('./test-config')

describe('Returned Objects', function () {
  it('has the same methods on octo.repos(REPO_ID).fetch().then(repo) as octo.me.repos.fetch().then(repos[0])', () =>
    client.me.repos.fetch()
    .then(function ({items}) {
      expect(items).to.not.be.empty
      return items[0].forks.fetch()
    })
  )

  it('has the same methods on octo.gists(ID).fetch().then(gist) as octo.gists.public.fetch().then(gists[0])', () =>
    client.gists.public.fetch()
    .then(function ({items}) {
      expect(items).to.not.be.empty
      return expect(items[0].star.contains).to.be.a.function
    })
  )

  it('has the same methods on octo.users(ID).fetch().then(user) as octo.users.fetch().then(users[0])', () =>
    client.users.fetch()
    .then(function ({items}) {
      expect(items).to.not.be.empty
      return expect(items[0].gists.fetch).to.be.a.function
    })
  )

  return it('has does not add the root context to returned objects', () =>
    client.repos(REPO_USER, REPO_NAME).issues(1).fetch().then(function (issue) {
      expect(issue.user.avatar.url).to.not.be.null
      return expect(issue.user.avatar.url).to.be.a.string
    })
  )
})
