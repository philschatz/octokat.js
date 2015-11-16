var x;
if (typeof window !== 'undefined') {
  x = window.XMLHTTPRequest;
} else {
  x = require('xmlhttprequest');
}

module.exports = x;
