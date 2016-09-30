// Base64 Encoder
// ===============================
//
// Used for sending binary files and encoding the auth username/password

if (typeof window !== 'undefined' && window !== null) {
  var base64encode = window.btoa;
// Use the `Buffer` if available (NodeJS)
} else if (__guard__(global, x => x['Buffer'])) {
  var base64encode = function(str) {
    let buffer = new global['Buffer'](str, 'binary');
    return buffer.toString('base64');
  };
} else {
  throw new Error('Native btoa function or Buffer is missing');
}

module.exports = base64encode;

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}