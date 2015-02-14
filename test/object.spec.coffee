define = window?.define or (deps, cb) -> cb((require(dep.replace('cs!./', './')) for dep in deps)...)
define ['chai', 'cs!./test-config'], ({assert, expect}, {client, USERNAME, TOKEN, ORG_NAME, REPO_USER, REPO_NAME, REPO_HOMEPAGE, OTHER_HOMEPAGE, OTHER_USERNAME, DEFAULT_BRANCH, LONG_TIMEOUT, SHORT_TIMEOUT}) ->

  describe 'Returned Objects', ->
    it 'has the same methods on octo.repos(REPO_ID).fetch().then(repo) as octo.me.repos.fetch().then(repos[0])', (done) ->
      client.me.repos.fetch()
      .then (repos) ->
        expect(repos).to.not.be.empty
        repos[0].forks.fetch()
        .then -> done()

    it 'has the same methods on octo.gists(ID).fetch().then(gist) as octo.gists.public.fetch().then(gists[0])', (done) ->
      client.gists.public.fetch()
      .then (gists) ->
        expect(gists).to.not.be.empty
        expect(gists[0].star.contains).to.be.a.function
        done()

    it 'has the same methods on octo.users(ID).fetch().then(user) as octo.users.fetch().then(users[0])', (done) ->
      client.users.fetch()
      .then (users) ->
        expect(users).to.not.be.empty
        expect(users[0].gists.fetch).to.be.a.function
        done()
