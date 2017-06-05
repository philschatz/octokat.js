/* eslint-env mocha */
require('fetch-vcr').configure({
  fixturePath: './node_modules/octokat-fixtures/_fixtures',
  headerBlacklist: ['authorization', 'user-agent']
})

require('./all')
debugger
