/* eslint-env mocha */
const { expect } = require('chai')
const { client, LONG_TIMEOUT, test_repo } = require('../test-config')

describe('Commits', function () {
  this.timeout(LONG_TIMEOUT)

  it('returns all commits', () =>
    client.repos('sferik/rails_admin').commits.fetch()
    .then(({items}) => expect(items[0].author).to.be.ok)
  )

  // it "handles branch or sha argument", ->
  it('handles the sha option', () => client.repos('sferik/rails_admin').commits.fetch({sha: 'master'}))

  it('returns all commits on the specified date', () =>
    client.repos('sferik/rails_admin').commits.fetch({since: '2011-01-20'})
    .then(({items}) => expect(items).to.be.an.Array)
  )

  it('returns a commit', () =>
    client.repos('sferik/rails_admin').commits('3cdfabd973bc3caac209cba903cfdb3bf6636bcd').fetch()
    .then(commit => expect(commit.author.login).to.equal('caboteria'))
  )

  it('returns a detailed git commit', () =>
    client.repos('octokit/octokit.rb').git.commits('2bfca14ed8ebc3dad75082ff175e6703aed7ccc0').fetch()
    .then(commit => expect(commit.author.name).to.equal('Joey Wendt'))
  )

  it('creates a commit', () =>
    client.repos(test_repo).commits.fetch()
    .then(function ({items}) {
      let lastCommit = items[items.length - 1]

      return client.repos(test_repo).git.commits.create({message: 'My commit message', tree: lastCommit.commit.tree.sha, parents: [lastCommit.sha]})
    })
  )

  it('merges a branch into another', function () {
    let afterRemove = function () {
      let repo = client.repos(test_repo)
      return repo.commits.fetch()
      .then(function ({items}) {
        let lastCommit = items[items.length - 1]
        return repo.git.refs.create({ref: 'refs/heads/branch-to-merge', sha: lastCommit.sha})
        .then(function (v) {
          let head = 'master'
          let base = 'branch-to-merge'
          let commitMessage = 'Testing the merge API'
          return client.repos(test_repo).merges.create({base, head, commitMessage})
        })
      })
    }

    return client.repos(test_repo).git.refs.heads('branch-to-merge').remove()
    .then(afterRemove, afterRemove)
  })

  it('returns a comparison', () =>
    client.repos('gvaughn/octokit').compare('0e0d7ae299514da692eb1cab741562c253d44188', 'b7b37f75a80b8e84061cd45b246232ad958158f5').fetch()
    .then(function (comparison) {
      expect(comparison.base_commit.sha).to.equal('0e0d7ae299514da692eb1cab741562c253d44188')
      return expect(comparison.merge_base_commit.sha).to.equal('b7b37f75a80b8e84061cd45b246232ad958158f5')
    })
  )
})
