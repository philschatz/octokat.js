define = window?.define or (deps, cb) -> cb((require(dep.replace('cs!', '')) for dep in deps)...)
define ['chai', 'cs!./test-config'], ({assert, expect}, {client, REPO_USER, REPO_NAME}) ->

  describe 'URL Hypermedia Patterns', ->

    it 'supports hypermedia URLs with optional URL and querystring params', ->
      template = '/repos/{repoName}{/user}{/foo}/releases/1/assets{?name,title,label}'
      expected = '/repos/AAA/BBB/releases/1/assets?name=CCC&label=DDD'
      params =
        repoName: 'AAA'
        user: 'BBB'
        name: 'CCC'
        label: 'DDD'
      {url} = client.fromUrl(template, params)
      expect(url).to.equal(expected)

    it 'supports hypermedia URLs with missing querystring params', ->
      template = '/repos{?label,title}'
      expected = '/repos'
      params = {}
      {url} = client.fromUrl(template, params)
      expect(url).to.equal(expected)


    it 'supports fetching from a hypermedia-constructed URL', (done) ->
      template = '/repos/{repoUser}{/repoName}'
      params =
        repoUser: REPO_USER
        repoName: REPO_NAME
      client.fromUrl(template, params).fetch()
      .then (repo) ->
        expect(repo.name).to.equal(REPO_NAME)
        done()

    it 'supports & in templates', ->
      template = 'https://api.github.com/search/code?q={query}{&page,per_page,sort,order}'
      expected = 'https://api.github.com/search/code?q=octokat&per_page=100'
      params =
        query: 'octokat'
        per_page: 100
      {url} = client.fromUrl(template, params)
      expect(url).to.equal(expected)

    it 'throws error if a required field is missing', ->
      template = 'https://api.github.com/search/code?q={query}{&page,per_page,sort,order}'
      params =
        # query: 'octokat'
        per_page: 100

      fn = -> client.fromUrl(template, params)
      assert.throw(fn, Error, 'Octokat Error: Required parameter is missing: query')


  describe 'Hypermedia type conversion', ->
    it 'converts date strings to dates (parse)', ->
      json =
        created_at: '2016-01-01'
      expectedMs = Date.parse(json.created_at)
      actualMs = client.parse(json).createdAt.getTime()
      expect(actualMs).to.equal(expectedMs)

    it 'converts date strings to dates (fetch)', (done) ->
      client.repos(REPO_USER, REPO_NAME).fetch().then (info) ->
        expect(info.createdAt).to.be.an.instanceof(Date)
        done()

  # describe 'URL Hypermedia Patterns (only tested in Node)', ->
  #
  #   URL_PATTERN = 'https://foo{?name,label}'
  #   CONTENT_TYPE = 'application/javascript'
  #   CONTENT = 'js_contents()'
  #
  #   it 'supports a single optional arg', (done) ->
  #     EXPECTED_URL = 'https://foo?name=build.js'
  #     requestFn = (method, url, content, {contentType, raw}) ->
  #       expect(url).to.equal(EXPECTED_URL)
  #       expect(content).to.equal(CONTENT)
  #       expect(contentType).to.equal(CONTENT_TYPE)
  #       expect(raw).to.be.true
  #       done()
  #     data = {upload_url: URL_PATTERN}
  #     {data} = HYPERMEDIA.responseMiddleware({requestFn, data})
  #     data.upload('build.js', CONTENT_TYPE, CONTENT)
  #
  #   it 'supports a single optional arg which is not a string', (done) ->
  #     EXPECTED_URL = 'https://foo?name=1234'
  #     requestFn = (method, url, content, {contentType, raw}) ->
  #       expect(url).to.equal(EXPECTED_URL)
  #       expect(content).to.equal(CONTENT)
  #       expect(contentType).to.equal(CONTENT_TYPE)
  #       expect(raw).to.be.true
  #       done()
  #     data = {upload_url: URL_PATTERN}
  #     {data} = HYPERMEDIA.responseMiddleware({requestFn, data})
  #     data.upload(1234, CONTENT_TYPE, CONTENT)
  #
  #   it 'supports multiple optional args', (done) ->
  #     EXPECTED_URL = 'https://foo?name=build.js&label=MY%20LABEL'
  #     requestFn = (method, url, content, {contentType, raw}) ->
  #       expect(url).to.equal(EXPECTED_URL)
  #       expect(content).to.equal(CONTENT)
  #       expect(contentType).to.equal(CONTENT_TYPE)
  #       expect(raw).to.be.true
  #       done()
  #     data = {upload_url: URL_PATTERN}
  #     {data} = HYPERMEDIA.responseMiddleware({requestFn, data})
  #     data.upload({name: 'build.js', label: 'MY LABEL'}, CONTENT_TYPE, CONTENT)
