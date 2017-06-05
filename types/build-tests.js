const fs = require('fs')

const plus = require('../src/plus')
const routes = require('./routes.json')
const responseTypes = require('./response-types.json')


const CONFIG = {
  ':owner': 'octokit-test-org',
  ':repo': 'octokit-org-test-repo',
  ':issue_number': '1',
  ':username': 'philschatz',
  ':gist_id': '5a44800ed2b6a02ef4540bf0fc87b776',
  ':commit_sha': '8a916cc3af923653680ce59592f88b31a6a5afba',
}


// TODO: add these to octokat (but keep skipping some of them. like the enterprise ones)
const URL_EXCEPTIONS = [
  '/applications/grants',
  '/authorizations',
  '/user/subscriptions',
  '/integration/installations',
  '/installation/repositories',
  '/:owner/:name/import/large_files',
  '/search/repositories',
  '/search/code',
  '/search/commits',
  '/search/issues',
  '/search/users',
  '/user/memberships/orgs',
  '/user/keys',
  '/user/gpg_keys',
  '/user/blocks',
  '/user/repository_invitations',
  '/enterprise/settings/license',
  '/admin/pre_receive_environments',
  '/admin/pre-receive-hooks',
  '/zen',

  '/users/:username/subscriptions',
  '/user/following/:username',
  '/user/blocks/:username',

  '/networks/:owner/:repo/events',
  '/user/starred/:owner/:repo',
  '/repos/:owner/:repo/git/refs/tags',
  '/repos/:owner/:repo/issues/:issue_number/timeline',
  '/repos/:owner/:repo/import',
  '/repos/:owner/:repo/import/authors',
  '/repos/:owner/:repo/license',
  '/repos/:owner/:repo/issues/:issue_number/reactions',
  '/repos/:owner/:repo/collaborators/:username',
  '/repos/:owner/:repo/keys',
  '/repos/:owner/:repo/pages',
  '/repos/:owner/:repo/pages/builds',
  '/repos/:owner/:repo/pages/builds/latest',
  '/repos/:owner/:repo/releases/latest',

  '/gists/:gist_id/commits',
  '/gists/:gist_id/star',
  '',
  '',
  '',
  '',
]



const validators = Object.keys(responseTypes).map((responseTypeName) => {
  const responseType = responseTypes[responseTypeName]
  let validateFields = Object.keys(responseType).map((fieldName) => {
    const {type, required} = responseType[fieldName]

    // pesky emojis
    const fieldNameEscaped = /^[a-z][a-z0-9_]*$/.test(fieldName) ? `.${fieldName}` : `['${fieldName}']`

    if (required) {
      if (typeof type === 'string') {
        switch (type) {
          case 'String':
          case 'string':
            return `expect(response${fieldNameEscaped}, 'response.${fieldName}: ' + JSON.stringify(response)).to.be.a('string')`
            break;
          case 'Number':
          case 'number':
            return `expect(response${fieldNameEscaped}, 'response.${fieldName}: ' + JSON.stringify(response)).to.be.a('number')`
            break;
          case 'Boolean':
          case 'boolean':
            return `expect(response${fieldNameEscaped}, 'response.${fieldName}: ' + JSON.stringify(response)).to.be.a('boolean')`
            break;
          default:
            // if the type ends in [] then it is an array, so validate each entry
            if (/\[\]$/.test(type)) {
              return `response${fieldNameEscaped}.forEach((item) => VALIDATORS['${type.substring(0, type.length - 2)}'](item))`
            } else {
              return `VALIDATORS['${type}'](response${fieldNameEscaped})`
            }
        }
      } else if (Array.isArray(type)) {
        return `expect(response${fieldNameEscaped}, 'response.${fieldName}: ' + JSON.stringify(response)).to.be.oneOf(${JSON.stringify(type)})`
      } else {
        console.log(`TODO: Skipping nested object for now keys=${Object.keys(type)}`);
        // console.log(type);
        // throw new Error(`BUG: Unhandled type ${type}`)
      }
    }
  })

  if (responseTypeName === 'Emojis') {
    validateFields = [`expect(response["+1"]).to.be.a("string") /* Shortcot for emojis */`]
  }

  return `
VALIDATORS['${responseTypeName}'] = (response) => {
  expect(response, 'BUG: this might need to be optional').to.not.be.null
  ${validateFields.join('\n  ')}
  return true
}
`
})



const tests = []

Object.keys(routes).forEach((key1) => {
  Object.keys(routes[key1]).forEach((key2) => {

    const {url, method, params, yields} = routes[key1][key2]

    if (url && method === 'GET') {
      let segments = url.split('/')
      segments.shift() // drop the leading slash

      let isSkipped = URL_EXCEPTIONS.indexOf(url) >= 0

      let inFunctionCall = false
      let command = 'octo'
      segments.forEach((segment) => {
        if (segment[0] === ':') {
          if (!inFunctionCall) {
            inFunctionCall = true
            command += '('
          } else {
            command += ', '
          }
          command += `CONFIG['${segment}']`
          // Skip the test if we do not have a segment configured yet
          if (!CONFIG[segment]) {
            isSkipped = true
          }
        } else {
          if (inFunctionCall) {
            inFunctionCall = false
            command += ')'
          }
          command += `.${plus.camelize(segment)}`
        }
      })
      if (inFunctionCall) {
        inFunctionCall = false
        command += ')'
      }

      let yieldsStr
      if (yields) {
        if (/SearchResult/.test(yields)) {
          const underlyingType = yields.substring('SearchResult<'.length, yields.length - 1)
          yieldsStr = `'SearchResult')('${underlyingType}'`
        } else {
          yieldsStr = `'${yields}'`
        }
      } else {
        yieldsStr = "'any'"
      }


      tests.push(`
it${isSkipped ? '.skip' : ''}("runs ${url} and yields a ${yieldsStr}", () => {
  // Explicitly write the code here so Typescript can typecheck this file
  return ${command}.fetch().then(validate(${yieldsStr}))
})
`)
    }
  })
})





const source = `

const { assert, expect } = require('chai')
//const Octokat = require('../')
const OctokatBase = require('../dist/node/base')
const fetchVCR = require('fetch-vcr')

fetchVCR.configure({
  fixturePath: './node_modules/octokat-fixtures/_fixtures'
})

// Octokat.Fetch = fetchVCR
OctokatBase.Fetch = fetchVCR

const OctokatPlugins = [
  require('../dist/node/plugins/object-chainer'),
  require('../dist/node/plugins/path-validator'),
  require('../dist/node/plugins/authorization'),
  require('../dist/node/plugins/preview-apis'),
  require('../dist/node/plugins/use-post-instead-of-patch'),

  require('../dist/node/plugins/simple-verbs'),
  require('../dist/node/plugins/fetch-all'),

  require('../dist/node/plugins/read-binary'),
  require('../dist/node/plugins/pagination'),
]

const octo = new OctokatBase({token: process.env['GH_TOKEN'], plugins: OctokatPlugins})

const CONFIG = ${JSON.stringify(CONFIG)}

const VALIDATORS = { }

const validate = (responseType) => {
  const v = VALIDATORS[responseType]
  if (!v) { throw new Error('BUG! missing validator for type "' + responseType + '"') }
  return v
}

// Hardcoded validator for generic arrays
VALIDATORS['any[]'] = (response) => {
  expect(response).to.be.an('array')
}
VALIDATORS['any'] = (response) => {
  console.log('TODO: change this response to be typed')
  expect(response).to.be.truthy
}
VALIDATORS['Boolean'] = (response) => {
  expect(response).to.be.a('boolean')
}
// This one is curried
VALIDATORS['SearchResult'] = (underlyingType) => (response) => {
  expect(response.items).to.be.an('array')
  response.items.forEach((item) => {
    VALIDATORS[underlyingType](item)
  })
  // TODO: check the nextPage, previousPage structure
}


${validators.join('\n')}


${tests.join('\n\n')}

`

fs.writeFileSync(__dirname + '/tests.js', source)
