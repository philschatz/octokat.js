# Base64 Encoder
# ===============================
#
# Used for sending binary files and encoding the auth username/password

if window?
  base64encode = window.btoa
# Use the `Buffer` if available (NodeJS)
else if global?['Buffer']
  base64encode = (str) ->
    buffer = new global['Buffer'](str, 'binary')
    return buffer.toString('base64')
else
  throw new Error('Native btoa function or Buffer is missing')

module.exports = base64encode
