const fetch = require('fetch-vcr')
const Octokat = require('../index')

// Configure the fetch-vcr
Octokat.Fetch = fetch
fetch.configure({fixturePath: './node_modules/octokat-fixtures/_fixtures'})

let config = {
  USERNAME: 'octokit-test',
  ORG_NAME: 'octokit-test-org',
  REPO_USER: 'octokit-test-org',
  REPO_NAME: 'octokit-org-test-repo',
  REPO_HOMEPAGE: 'https:/github.com/philschatz/octokat.js',
  OTHER_HOMEPAGE: 'http://example.com',
  OTHER_USERNAME: 'octokit-test2',
  DEFAULT_BRANCH: 'master',
  LONG_TIMEOUT: 10 * 1000, // 10 seconds
  SHORT_TIMEOUT: 5 * 1000 // 5 seconds
}

if (process && process.env['GH_TOKEN']) {
  config.TOKEN = process.env['GH_TOKEN']
} else {
  console.warn('===================================')
  console.warn('WARNING: No GitHub token specified')
  console.warn('')
  console.warn('The tests use recorded HTTP responses from the GitHub API which are stored in the node_modules/octokat-fixtures/_fixtures/ directory')
  console.warn('You can ignore this warning if you are changing the code (but not the tests)')
  console.warn('')
  console.warn('If you are adding tests you may need to do the following:')
  console.warn('')
  console.warn('1. create a Personal Access Token at https://github.com/settings/tokens')
  console.warn('  - Note: only add the OAuth scopes you need to write your tests')
  console.warn('2. Copy the token to the clipboard and run the tests like so:')
  console.warn('  - `GH_TOKEN=d34db33f123456 npm test`')
  console.warn('')
  console.warn('===================================')
}

config.Octokat = Octokat
config.client = new Octokat({token: config.TOKEN})
config.test_repo = `${config.REPO_USER}/${config.REPO_NAME}`
config.test_github_login = config.USERNAME

module.exports = config
