define = window?.define or (deps, cb) -> cb((require(dep.replace('cs!', '')) for dep in deps)...)
define ['chai', 'cs!../src/replacer'], ({assert, expect}, Replacer) ->

  describe 'URL Patterns (only tested in Node)', ->

    URL_PATTERN = 'https://foo{?name,label}'
    CONTENT_TYPE = 'application/javascript'
    CONTENT = 'js_contents()'

    it 'supports a single optional arg', (done) ->
      EXPECTED_URL = 'https://foo?name=build.js'
      request = (method, url, content, {contentType, raw}) ->
        expect(url).to.equal(EXPECTED_URL)
        expect(content).to.equal(CONTENT)
        expect(contentType).to.equal(CONTENT_TYPE)
        expect(raw).to.be.true
        done()
      r = new Replacer(request)
      o = r.replace({upload_url: URL_PATTERN})
      o.upload('build.js', CONTENT_TYPE, CONTENT)

    it 'supports a single optional arg which is not a string', (done) ->
      EXPECTED_URL = 'https://foo?name=1234'
      request = (method, url, content, {contentType, raw}) ->
        expect(url).to.equal(EXPECTED_URL)
        expect(content).to.equal(CONTENT)
        expect(contentType).to.equal(CONTENT_TYPE)
        expect(raw).to.be.true
        done()
      r = new Replacer(request)
      o = r.replace({upload_url: URL_PATTERN})
      o.upload(1234, CONTENT_TYPE, CONTENT)

    it 'supports multiple optional args', (done) ->
      EXPECTED_URL = 'https://foo?name=build.js&label=MY%20LABEL'
      request = (method, url, content, {contentType, raw}) ->
        expect(url).to.equal(EXPECTED_URL)
        expect(content).to.equal(CONTENT)
        expect(contentType).to.equal(CONTENT_TYPE)
        expect(raw).to.be.true
        done()
      r = new Replacer(request)
      o = r.replace({upload_url: URL_PATTERN})
      o.upload({name: 'build.js', label: 'MY LABEL'}, CONTENT_TYPE, CONTENT)
