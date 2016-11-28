/* eslint-env mocha */
const { assert, expect } = require('chai')
const { client, REPO_USER, REPO_NAME } = require('./test-config')

describe('URL Hypermedia Patterns', function () {
  it('supports hypermedia URLs with optional URL and querystring params', function () {
    let template = '/repos/{repoName}{/user}{/foo}/releases/1/assets{?name,title,label}'
    let expected = '/repos/AAA/BBB/releases/1/assets?name=CCC&label=DDD'
    let params = {
      repoName: 'AAA',
      user: 'BBB',
      name: 'CCC',
      label: 'DDD'
    }
    let {url} = client.fromUrl(template, params)
    return expect(url).to.equal(expected)
  })

  it('supports hypermedia URLs with missing querystring params', function () {
    let template = '/repos{?label,title}'
    let expected = '/repos'
    let params = {}
    let {url} = client.fromUrl(template, params)
    return expect(url).to.equal(expected)
  })

  it('supports fetching from a hypermedia-constructed URL', function () {
    let template = '/repos/{repoUser}{/repoName}'
    let params = {
      repoUser: REPO_USER,
      repoName: REPO_NAME
    }
    return client.fromUrl(template, params).fetch()
    .then(repo => expect(repo.name).to.equal(REPO_NAME))
  })

  it('supports & in templates', function () {
    let template = 'https://api.github.com/search/code?q={query}{&page,per_page,sort,order}'
    let expected = 'https://api.github.com/search/code?q=octokat&per_page=100'
    let params = {
      query: 'octokat',
      per_page: 100
    }
    let {url} = client.fromUrl(template, params)
    return expect(url).to.equal(expected)
  })

  return it('throws error if a required field is missing', function () {
    let template = 'https://api.github.com/search/code?q={query}{&page,per_page,sort,order}'
    let params =
      // query: 'octokat'
      {per_page: 100}

    let fn = () => client.fromUrl(template, params)
    return assert.throw(fn, Error, 'Octokat Error: Required parameter is missing: query')
  })
})

describe('Hypermedia type conversion', function () {
  it('converts date strings to dates (parse)', function () {
    let json =
      {created_at: '2016-01-01'}
    let expectedMs = Date.parse(json.created_at)
    return client.parse(json).then(function (val) {
      let actualMs = val.createdAt.getTime()
      return expect(actualMs).to.equal(expectedMs)
    })
  })

  return it('converts date strings to dates (fetch)', () =>
    client.repos(REPO_USER, REPO_NAME).fetch().then(info => expect(info.createdAt).to.be.an.instanceof(Date))
  )
})

// describe 'URL Hypermedia Patterns (only tested in Node)', ->
//
//   URL_PATTERN = 'https://foo{?name,label}'
//   CONTENT_TYPE = 'application/javascript'
//   CONTENT = 'js_contents()'
//
//   it 'supports a single optional arg', (done) ->
//     EXPECTED_URL = 'https://foo?name=build.js'
//     requestFn = (method, url, content, {contentType, raw}) ->
//       expect(url).to.equal(EXPECTED_URL)
//       expect(content).to.equal(CONTENT)
//       expect(contentType).to.equal(CONTENT_TYPE)
//       expect(raw).to.be.true
//       done()
//     data = {upload_url: URL_PATTERN}
//     {data} = HYPERMEDIA.responseMiddleware({requestFn, data})
//     data.upload('build.js', CONTENT_TYPE, CONTENT)
//
//   it 'supports a single optional arg which is not a string', (done) ->
//     EXPECTED_URL = 'https://foo?name=1234'
//     requestFn = (method, url, content, {contentType, raw}) ->
//       expect(url).to.equal(EXPECTED_URL)
//       expect(content).to.equal(CONTENT)
//       expect(contentType).to.equal(CONTENT_TYPE)
//       expect(raw).to.be.true
//       done()
//     data = {upload_url: URL_PATTERN}
//     {data} = HYPERMEDIA.responseMiddleware({requestFn, data})
//     data.upload(1234, CONTENT_TYPE, CONTENT)
//
//   it 'supports multiple optional args', (done) ->
//     EXPECTED_URL = 'https://foo?name=build.js&label=MY%20LABEL'
//     requestFn = (method, url, content, {contentType, raw}) ->
//       expect(url).to.equal(EXPECTED_URL)
//       expect(content).to.equal(CONTENT)
//       expect(contentType).to.equal(CONTENT_TYPE)
//       expect(raw).to.be.true
//       done()
//     data = {upload_url: URL_PATTERN}
//     {data} = HYPERMEDIA.responseMiddleware({requestFn, data})
//     data.upload({name: 'build.js', label: 'MY LABEL'}, CONTENT_TYPE, CONTENT)
