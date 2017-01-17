module.exports = function base64encode (str) {
  let buffer = new global['Buffer'](str, 'binary')
  return buffer.toString('base64')
}
