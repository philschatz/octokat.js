var path = require('path')

module.exports = {
  cache: true,
  devtool: 'source-map',
  entry: {
    octokat: [
      './test/browser.js'
    ]
  },
  output: {
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]',
    // library: 'OctokatTests',
    // libraryTarget: 'umd',
    path: 'dist',
    filename: 'octokat-browsertests.js'
  },
  module: {
    noParse: [
      /promise-filler/
    ],
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' }
    ]
  },
  resolve: {
    alias: {
      xmlhttprequest: path.join(__dirname, 'src/hacks/xmlhttprequest-filler-browser.js'),
      'es6-promise': path.join(__dirname, 'src/hacks/promise-filler-browser.js')
    },
    extensions: ['', '.js']
  }
}
