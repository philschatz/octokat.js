/* eslint-env mocha */
const { assert, expect } = require('chai')
const { Octokat, client, USERNAME, ORG_NAME, REPO_USER, REPO_NAME, OTHER_USERNAME, LONG_TIMEOUT } = require('./test-config')

// NodeJS does not have a btoa
let btoa = null

if (typeof window !== 'undefined' && window !== null) {
  btoa = window.btoa
  // Use the `Buffer` if available (NodeJS)
} else if (typeof global !== 'undefined' && global !== null) {
  btoa = function base64encode (str) {
    var buffer = new global['Buffer'](str, 'binary')
    return buffer.toString('base64')
  }
} else {
  throw new Error('Native btoa function or Buffer is missing')
}

let trapFail = function (promise) {
  let onError = function (err) {
    console.error(JSON.stringify(err))
    return assert.catch(err)
  }
  // Depending on the Promise implementation the fail method could be:
  // - `.catch` (native Promise)
  // - `.fail` (jQuery or angularjs)
  promise.then(null, onError)
  return promise
}

const GH = 'octo'
const REPO = 'myRepo'
const USER = 'someUser'
const ME = 'myUser'
// const BRANCH = 'BRANCH'
// let ANOTHER_USER = 'ANOTHER_USER'
const ORG = 'someOrg'
const GIST = 'someGist'
const ISSUE = 'someIssue'
// const COMMENT = 'someComment'

const STATE = {}

describe(`${GH} = new Octokat({token: ...})`, function () {
  this.timeout(LONG_TIMEOUT)

  let stringifyAry = function (args) {
    if (!Array.isArray(args)) { args = [args] }
    if (!args.length) { return '' }
    let arr = (args.map((arg) => JSON.stringify(arg)))
    return arr.join(', ')
  }

  let itIs = function (obj, msg, args, cb) {
    let code = ''
    let isFuncArgs = false
    args.forEach((arg) => {
      if (isFuncArgs) {
        code += `(${stringifyAry(arg)})`
      } else {
        code += `.${arg}`
      }

      isFuncArgs = !isFuncArgs
    })

    if (isFuncArgs) { code += '()' }

    let constructMethod = function () {
      // Construct the method call
      let context = STATE[obj]
      isFuncArgs = false // Every other arg is a function arg
      let finalArgs = []
      args.forEach((arg) => {
        let isLast = arg === args[args.length - 1]
        if (isFuncArgs) {
          if (!Array.isArray(arg)) { arg = [arg] }
          if (isLast) {
            finalArgs = arg
          } else {
            context = context(...arg)
          }
        } else {
          let names = arg.split('.')
          names.forEach((field) => {
            context = context[field]
          })
        }

        isFuncArgs = !isFuncArgs
      })

      return {finalArgs, context}
    }

    it(`${obj}${code}`, function () {
      let {finalArgs, context} = constructMethod()
      // If the last arg was something like 'fetch' then
      if (isFuncArgs) {
        context().then(cb)
      } else {
        context(...finalArgs).then(cb)
      }
    })

    it(`${obj}${code} (callback ver)`, function () {
      let {finalArgs, context} = constructMethod()
      context(...finalArgs, function (err, val) {
        if (err) { return assert.fail(err) }
        cb(val)
      })
    })
  }

  let itIsOk = (obj, ...args) => itIs(obj, '', args, val => expect(val).to.be.ok)

  let itIsArray = (obj, ...args) =>
    itIs(obj, ' yields Array', args, val => expect(val).to.be.an.array)

  let itIsFalse = (obj, ...args) =>
    itIs(obj, ' yields False', args, val => expect(val).to.be.false)

  let itIsBoolean = (obj, ...args) => itIs(obj, '', args, val => expect(val === true || val === false).to.be.true)

  before(() => { STATE[GH] = client })

  describe('Synchronous methods', function () {
    it(`supports octo.fromUrl('https://api.github.com/repos/${REPO_USER}/${REPO_NAME}')`, () =>
      client.fromUrl(`https://api.github.com/repos/${REPO_USER}/${REPO_NAME}`)
      .fetch().then(val => expect(val).to.not.be.null)
    )

    it(`supports octo.fromUrl('/repos/${REPO_USER}/${REPO_NAME}')`, () =>
      client.fromUrl(`/repos/${REPO_USER}/${REPO_NAME}`)
      .fetch().then(val => expect(val).to.not.be.null)
    )
  })

  it('supports octo.parse(json)', function (done) {
    let json = {
      url: 'https://api.github.com/repos/philschatz/octokat.js',
      foo_url: 'http://philschatz.com',
      field: 'Hello there!',
      bar: {
        baz_url: 'http://philschatz.com'
      }
    }
    client.parse(json, function (err, ret) {
      expect(err).to.be.null
      expect(ret.field).to.equal(json.field)
      expect(ret.url).to.equal(json.url)
      expect(ret.foo.url).to.equal(json.foo_url)
      // Make sure the parse recurses
      expect(ret.bar.baz.url).to.equal(json.bar.baz_url)
      // Make sure the obj was detected to be a repo
      expect(ret.fetch).to.not.be.null
      expect(ret.issues).to.not.be.null
      done()
    })
  })

  describe('Miscellaneous APIs', function () {
    itIsOk(GH, 'zen.read')
    itIsOk(GH, 'octocat.read')
    itIsOk(GH, 'octocat.read', {s: 'There is no need to be upset'})
    itIsOk(GH, 'emojis.fetch')
    itIsOk(GH, 'gitignore.templates.fetch')
    itIsOk(GH, 'gitignore.templates', 'C', 'read')
    // itIsOk(GH, 'markdown.create', [{text:'# Hello There'}, true])
    itIsOk(GH, 'meta.fetch')
    itIsOk(GH, 'rateLimit.fetch')
    itIsOk(GH, 'feeds.fetch')
  })

  itIsArray(GH, 'users.fetch')
  itIsArray(GH, 'gists.public.fetch')
  // itIsArray(GH, 'global.events')
  // itIsArray(GH, 'global.notifications')

  itIsArray(GH, 'search.repositories.fetch', {q: 'octokat'}) // {q: 'github'}
  // itIsArray(GH, 'search.code.fetch', {q:'github'})
  itIsArray(GH, 'search.issues.fetch', {q: 'octokat'})
  itIsArray(GH, 'search.users.fetch', {q: 'octokat'})

  itIsOk(GH, 'users', REPO_USER, 'fetch')
  itIsOk(GH, 'orgs', ORG_NAME, 'fetch')
  itIsOk(GH, 'repos', [REPO_USER, REPO_NAME], 'fetch')
  itIsArray(GH, 'issues.fetch')

  describe('Paged Results', function () {
    describe('Deprecated Notation', function () {
      it(`${GH}.gists.public.fetch().then(results) -> results.nextPage()`, () =>
        trapFail(STATE[GH].gists.public.fetch())
        .then(({nextPage}) =>
          nextPage()
          .then(function ({items}) {
            expect(items).to.be.an('array')
            return expect(items).to.have.length.at.least(1)
          })
        )
      )

      it(`${GH}.gists.public.fetch().then(results) -> results.prevPage()`, () =>
        trapFail(STATE[GH].gists.public.fetch())
        .then(({nextPage}) =>
          nextPage()
          .then(({prevPage}) =>
            prevPage()
            .then(function () {})
          )
        )
      )

      it(`${GH}.gists.public.fetch().then(results) -> results.firstPage()`, () =>
        trapFail(STATE[GH].gists.public.fetch())
        .then(({nextPage}) =>
          nextPage()
          .then(({firstPage}) =>
            firstPage()
            .then(function () {})
          )
        )
      )

      it(`${GH}.gists.public.fetch().then(results) -> results.lastPage()`, () =>
        trapFail(STATE[GH].gists.public.fetch())
        .then(({lastPage}) => lastPage())
      )
    })

    describe('New Notation', function () {
      it(`${GH}.gists.public.fetch().then(results) -> results.nextPage.fetch()`, () =>
        trapFail(STATE[GH].gists.public.fetch())
        .then(({nextPage}) =>
          nextPage.fetch()
          .then(function ({items}) {
            expect(items).to.be.an('array')
            return expect(items).to.have.length.at.least(1)
          })
        )
      )

      it(`${GH}.gists.public.fetch().then(results) -> results.prevPage.fetch()`, () =>
        trapFail(STATE[GH].gists.public.fetch())
        .then(({nextPage}) =>
          nextPage.fetch()
          .then(({prevPage}) =>
            prevPage.fetch()
            .then(function () {})
          )
        )
      )

      it(`${GH}.gists.public.fetch().then(results) -> results.firstPage.fetch()`, () =>
        trapFail(STATE[GH].gists.public.fetch())
        .then(results =>
          results.nextPage.fetch()
          .then(moreResults =>
            moreResults.firstPage.fetch()
            .then(function () {})
          )
        )
      )

      it(`${GH}.gists.public.fetch().then(results) -> results.lastPage.fetch()`, () =>
        trapFail(STATE[GH].gists.public.fetch())
        .then(results => results.lastPage.fetch())
      )
    })
  })

  describe(`${REPO} = ${GH}.repos(OWNER, NAME)`, function () {
    before(() => { STATE[REPO] = STATE[GH].repos(REPO_USER, REPO_NAME) })

    itIsOk(REPO, 'fetch')

    // Accessors for methods generated from URL patterns
    itIsArray(REPO, 'collaborators.fetch')
    itIsOk(REPO, 'readme.read')
    itIsArray(REPO, 'hooks.fetch')
    itIsArray(REPO, 'assignees.fetch')
    itIsArray(REPO, 'languages.fetch')
    itIsArray(REPO, 'teams.fetch')
    itIsArray(REPO, 'tags.fetch')
    itIsArray(REPO, 'branches.fetch')
    itIsArray(REPO, 'contributors.fetch')
    itIsArray(REPO, 'subscribers.fetch')
    itIsArray(REPO, 'subscription.fetch')
    itIsArray(REPO, 'comments.fetch')
    itIsArray(REPO, 'downloads.fetch')
    itIsArray(REPO, 'milestones.fetch')
    itIsArray(REPO, 'labels.fetch')
    itIsArray(REPO, 'stargazers.fetch')
    itIsArray(REPO, 'forks.fetch')

    it(`camelCases URL fields that are not templated (ie ${REPO}.htmlUrl)`, () =>
      STATE[REPO].fetch().then(repo => expect(repo.htmlUrl).to.be.a('string'))
    )

    describe(`${REPO}.issues...`, function () {
      itIsArray(REPO, 'issues.fetch')
      itIsArray(REPO, 'issues.events.fetch')
      itIsArray(REPO, 'issues.comments.fetch')
      // itIsArray(REPO, 'issues.comments', commentId, 'fetch')

      itIsOk(REPO, 'issues.create', {title: 'Test Issue'})
      itIsOk(REPO, 'issues', 1, 'fetch')
    })

    // itIsOk(REPO, 'pages.fetch')
    // itIsOk(REPO, 'pages.builds.fetch')
    // itIsOk(REPO, 'pages.builds.latest.fetch')

    describe(`${REPO}.stats...`, function () {
      itIsOk(REPO, 'stats.contributors.fetch')
      itIsOk(REPO, 'stats.commitActivity.fetch')
      // itIsOk(REPO, 'stats.codeFrequency.fetch') Commented because it seems to always return 403
      itIsOk(REPO, 'stats.participation.fetch')
      itIsOk(REPO, 'stats.punchCard.fetch')
    })

    describe(`${REPO}.git... (Git Data)`, function () {
      itIsArray(REPO, 'git.refs.fetch')
      // itIsArray(REPO, 'git.refs.tags.fetch')    This repo does not have any tags: TODO: create a tag
      itIsArray(REPO, 'git.refs.heads.fetch')

      // itIsOk(REPO, 'git.tags.create', {tag:'test-tag', message:'Test tag for units', ...})
      // itIsOk(REPO, 'git.tags.one', 'test-tag')
      itIsOk(REPO, 'git.trees', 'c18ba7dc333132c035a980153eb520db6e813d57', 'fetch')
      // itIsOk(REPO, 'git.trees.create', {tree: [sha], base_tree: sha})

      it('.git.refs.tags.fetch()', () =>
        STATE[GH].repos('philschatz', 'octokat.js').git.refs.tags.fetch().then(function ({items}) {
          expect(items).to.be.a('array')
          return expect(items.length).to.be.gt(17)
        })
      )

      it('.git.refs.tags("v0.1.1").fetch()', () =>
        STATE[GH].repos('philschatz', 'octokat.js').git.refs.tags('v0.1.1').fetch().then(tag => expect(tag).to.be.a('object'))
      )

      it('.git.refs("any/path").fetch() like pull/2/head refs on github', () =>
        STATE[GH].repos('philschatz', 'octokat.js').git.refs('pull/2/head').fetch().then(pullRef => expect(pullRef).to.be.a('object'))
      )

      it('.git.blobs.create("Hello")   and .blobs(sha).read()', () =>
        STATE[REPO].git.blobs.create({content: 'Hello', encoding: 'utf-8'})
        .then(function ({sha}) {
          expect(sha).to.be.ok
          return STATE[REPO].git.blobs(sha).read()
          .then(v => expect(v).to.equal('Hello'))
        })
      )

      it('.git.blobs.create(...) and .blobs(...).readBinary()', () => {
        return STATE[REPO].git.blobs.create({content: btoa('Hello'), encoding: 'base64'})
        .then(function ({sha}) {
          expect(sha).to.be.ok
          return STATE[REPO].git.blobs(sha).readBinary()
          .then(v => expect(v).to.have.string('Hello'))
        })
      })
    })

    // Make sure the library does not just ignore the isBase64 flag
    // TODO: This is commented because caching is only based on the path, not the flags (or the verb)
    // STATE[REPO].git.blobs.one(sha)
    // .then (v) ->
    //   expect(v).to.not.have.string('Hello')

    describe('Collaborator changes', function () {
      it('gets a list of collaborators', () =>
        trapFail(STATE[REPO].collaborators.fetch())
        .then(v => expect(v).to.be.an.array)
      )

      it('tests membership', () =>
        trapFail(STATE[REPO].collaborators.contains('random-user-name'))
        .then(v => expect(v).to.be.false)
      )

      it('adds and removes a collaborator', () =>
        trapFail(STATE[REPO].collaborators(OTHER_USERNAME).add())
        .then(function (v) {
          expect(v).to.be.ok
          return trapFail(STATE[REPO].collaborators(OTHER_USERNAME).remove())
          .then(v => expect(v).to.be.true)
        })
      )
    })
  })

  describe(`${USER} = ${GH}.users(USERNAME)`, function () {
    before(() => { STATE[USER] = STATE[GH].users(USERNAME) })

    itIsOk(USER, 'fetch')
    itIsArray(USER, 'repos.fetch')
    itIsArray(USER, 'orgs.fetch')
    itIsArray(USER, 'gists.fetch')
    itIsArray(USER, 'followers.fetch')
    itIsArray(USER, 'following.fetch')
    itIsFalse(USER, 'following.contains', 'defunkt')
    itIsArray(USER, 'keys.fetch')
    itIsArray(USER, 'events.fetch')
    itIsArray(USER, 'receivedEvents.fetch')
    itIsArray(USER, 'starred.fetch')

    it(`camelCases URL fields that are not templated (ie ${USER}.avatarUrl)`, () =>
      STATE[USER].fetch().then(function (repo) {
        expect(repo.htmlUrl).to.be.a('string')
        return expect(repo.avatarUrl).to.be.a('string')
      })
    )
  })

  describe(`${ORG} = ${GH}.orgs(ORG_NAME)`, function () {
    before(() => { STATE[ORG] = STATE[GH].orgs(ORG_NAME) })

    itIsArray(ORG, 'fetch')
    itIsArray(ORG, 'members.fetch')
    itIsArray(ORG, 'repos.fetch')
    return itIsArray(ORG, 'issues.fetch')
  })

  describe(`${ME} = ${GH}.me (the authenticated user)`, function () {
    before(() => { STATE[ME] = STATE[GH].me })

    // itIsOk(ME, 'fetch')

    itIsArray(ME, 'repos.fetch')
    itIsArray(ME, 'orgs.fetch')
    itIsArray(ME, 'followers.fetch')
    itIsArray(ME, 'following.fetch')
    itIsFalse(ME, 'following.contains', 'defunkt')
    itIsArray(ME, 'emails.fetch')
    itIsFalse(ME, 'emails.contains', 'invalid@email.com')
    // itIsArray(ME, 'keys.all')
    // itIsFalse(ME, 'keys.is', 'invalid-key')

    itIsArray(ME, 'issues.fetch')

    itIsArray(ME, 'starred.fetch')
    itIsBoolean(ME, 'starred.contains', 'philschatz/octokat.js')

    describe('Multistep operations', () =>

      it('.starred.add(OWNER, REPO), .starred.is(...), and then .starred.remove(...)', () =>
        trapFail(STATE[ME].starred(REPO_USER, REPO_NAME).add())
        .then(() =>
          STATE[ME].starred.contains(REPO_USER, REPO_NAME)
          .then(function (isStarred) {
            expect(isStarred).to.be.true
            return STATE[ME].starred(REPO_USER, REPO_NAME).remove()
            .then(v => expect(v).to.be.true)
          })
        )
      )
    )
  })

  describe(`${GIST} = ${GH}.gist(GIST_ID)`, function () {
    before(function () {
      // Create a Test Gist for all the tests
      let config = {
        description: 'Test Gist',
        'public': false,
        files: {
          'hello.txt': {
            content: 'Hello World'
          }
        }
      }

      return STATE[GH].gists.create(config)
      .then(gist => { STATE[GIST] = gist })
    })

    // itIsOk(GIST, 'fetch')

    // itIsArray(GIST, 'forks.all')

    // TODO: For some reason this test fails in the browser. Probably POST vs PUT?
    it('can be .starred.add() and .starred.remove()', () =>
      STATE[GIST].star.add()
      .then(() => STATE[GIST].star.remove())
    )
  })

  describe(`${ISSUE} = ${REPO}.issues(1)`, function () {
    before(() => { STATE[ISSUE] = STATE[REPO].issues(1) })

    itIsOk(ISSUE, 'fetch')
    itIsOk(ISSUE, 'update', {title: 'New Title', state: 'closed'})

    describe('Comment methods (Some are on the repo, issue, or comment)', function () {
      itIsArray(ISSUE, 'comments.fetch')
      itIsOk(ISSUE, 'comments.create', {body: 'Test comment'})
      // NOTE: Comment updating is awkward because it's on the repo, not a specific issue.
      // itIsOk(REPO, 'issues.comments.update', 43218269, {body: 'Test comment updated'})
      return itIsOk(REPO, 'issues.comments', 43218269, 'fetch')
    })
  })
})

      // Deprecated. Now provides only `issueUrl`
      // it 'comment.issue()', ->
      //   trapFail STATE[REPO].issues.comments(43218269).fetch()
      //   .then (comment) ->
      //     comment.issue()

// TODO: Refactor: put this back in once the constructor allows setting plugins
// describe 'Allows disabling hypermedia conversion', () ->
//   it 'returns a simple JSON object when fetching a repository', ->
//     client = new Octokat({token: TOKEN, disableHypermedia: true})
//     client.repos(REPO_USER, REPO_NAME).fetch()
//     .then (repo) ->
//       expect(repo.full_name).to.not.be.null
//       expect(repo.html_url).to.not.be.null
//       expect(repo.created_at).to.be.a('string')
//       # Serializing the object as JSON should work
//       JSON.stringify(repo)

describe('Cache Handler', () =>
  it('is called when refetching a URL', function () {
    let retreivedFromCache = false
    let cacheHandler = new class CacheHandler {
      constructor () {
        this._cachedETags = {}
      }
      get (method, path) {
        retreivedFromCache = !!this._cachedETags[`${method} ${path}`]
        return this._cachedETags[`${method} ${path}`]
      }
      add (method, path, eTag, data, status) {
        this._cachedETags[`${method} ${path}`] = {eTag, data, status}
      }
    }()

    const client2 = new Octokat({cacheHandler})
    return client2.repos(REPO_USER, REPO_NAME).fetch()
    .then(repo1 =>
      client2.repos(REPO_USER, REPO_NAME).fetch()
      .then(function (repo2) {
        expect(JSON.stringify(repo1)).to.equal(JSON.stringify(repo2))
        expect(retreivedFromCache).to.be.true
        return 'doneee'
      })
    )
  })
)
