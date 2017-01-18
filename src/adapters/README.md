This directory contains files whose implementations differ between a browser and node.

For example, browsers have `btoa()`, `XMLHttpRequest`, and `Promise`
while node has `Buffer.toString('base64')`, `require('xmlhttprequest')`, and `require('es6-promise')`.

Webpack uses the `browser` directive in `package.json` to override the `*-node.js`
modules so they are not included in the build.
