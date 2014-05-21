sepia = require('sepia')
chai      = require('chai')
Octokat   = require('../src/octokat')
makeTests = require('./common').makeTests

assert = chai.assert
expect = chai.expect

sepia.configure(includeHeaderNames:false)

# NodeJS does not have a btoa
btoa = (str) ->
  buffer = new Buffer str, 'binary'
  buffer.toString 'base64'

makeTests(assert, expect, btoa, Octokat)
