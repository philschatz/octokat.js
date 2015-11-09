path = require('path')
sepia = require('sepia')
require('./all')

require('./replacer.spec')

sepia.fixtureDir(path.join(__dirname, '..', 'node_modules', 'octokat-fixtures', 'fixtures'))
sepia.configure(includeHeaderNames:false)
