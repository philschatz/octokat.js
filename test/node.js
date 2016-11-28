/* eslint-env mocha */
const path = require('path')
const sepia = require('sepia')
require('./all')

sepia.fixtureDir(path.join(__dirname, '..', 'node_modules', 'octokat-fixtures', 'fixtures'))
sepia.configure({includeHeaderNames: false})
