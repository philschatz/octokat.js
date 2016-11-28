var path = require('path')

module.exports = {
  cache: true,
  entry: {
    octokat: [
      './test/browser.coffee'
    ]
  },
  output: {
    // library: 'OctokatTests',
    // libraryTarget: 'umd',
    path: 'dist',
    filename: 'octokat-tests.js'
  },
  module: {
    noParse: [
      /promise-filler/
    ],
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.coffee$/, loader: 'coffee-loader' }
    ]
  },
  resolve: {
    alias: {
      xmlhttprequest: path.join(__dirname, 'src/hacks/xmlhttprequest-filler-browser.js'),
      'es6-promise': path.join(__dirname, 'src/hacks/promise-filler-browser.js')
    },
    extensions: ['', '.js', '.coffee']
  }
}
