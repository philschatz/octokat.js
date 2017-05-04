This directory contains files whose implementations differ between a browser and node.

For example, browsers have `btoa()` and `XMLHttpRequest`
while node has `Buffer.toString('base64')` and `require('xmlhttprequest')`.

Webpack uses the `browser` directive in `package.json` to override the `*-node.js`
modules so they are not included in the build.
