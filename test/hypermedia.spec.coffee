define = window?.define or (deps, cb) -> cb((require(dep.replace('cs!', '')) for dep in deps)...)
define ['chai', 'cs!../src/plugin-middleware-response'], ({assert, expect}, {HYPERMEDIA}) ->

  describe 'URL Hypermedia Patterns (only tested in Node)', ->

    URL_PATTERN = 'https://foo{?name,label}'
    CONTENT_TYPE = 'application/javascript'
    CONTENT = 'js_contents()'

    it 'supports a single optional arg', (done) ->
      EXPECTED_URL = 'https://foo?name=build.js'
      requestFn = (method, url, content, {contentType, raw}) ->
        expect(url).to.equal(EXPECTED_URL)
        expect(content).to.equal(CONTENT)
        expect(contentType).to.equal(CONTENT_TYPE)
        expect(raw).to.be.true
        done()
      data = {upload_url: URL_PATTERN}
      {data} = HYPERMEDIA.responseMiddleware({requestFn, data})
      data.upload('build.js', CONTENT_TYPE, CONTENT)

    it 'supports a single optional arg which is not a string', (done) ->
      EXPECTED_URL = 'https://foo?name=1234'
      requestFn = (method, url, content, {contentType, raw}) ->
        expect(url).to.equal(EXPECTED_URL)
        expect(content).to.equal(CONTENT)
        expect(contentType).to.equal(CONTENT_TYPE)
        expect(raw).to.be.true
        done()
      data = {upload_url: URL_PATTERN}
      {data} = HYPERMEDIA.responseMiddleware({requestFn, data})
      data.upload(1234, CONTENT_TYPE, CONTENT)

    it 'supports multiple optional args', (done) ->
      EXPECTED_URL = 'https://foo?name=build.js&label=MY%20LABEL'
      requestFn = (method, url, content, {contentType, raw}) ->
        expect(url).to.equal(EXPECTED_URL)
        expect(content).to.equal(CONTENT)
        expect(contentType).to.equal(CONTENT_TYPE)
        expect(raw).to.be.true
        done()
      data = {upload_url: URL_PATTERN}
      {data} = HYPERMEDIA.responseMiddleware({requestFn, data})
      data.upload({name: 'build.js', label: 'MY LABEL'}, CONTENT_TYPE, CONTENT)
