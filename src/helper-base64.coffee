define = window?.define or (name, deps, cb) -> cb((require(dep.replace('cs!octokat-part/', './')) for dep in deps)...)
define 'octokat-part/helper-base64', [], () ->

  # Base64 Encoder
  # ===============================
  #
  # Used for sending binary files and encoding the auth username/password

  # Use the `Buffer` if available (NodeJS)
  if @Buffer
    base64encode = (str) ->
      buffer = new @Buffer(str, 'binary')
      return buffer.toString('base64')
  else
    throw new Error('Native btoa function is missing') unless @btoa
    base64encode = @btoa

  module?.exports = base64encode
  return base64encode
