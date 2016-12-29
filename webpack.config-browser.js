var path = require('path')

module.exports = {
  cache: true,
  devtool: 'source-map',
  entry: {
    octokat: [
      './src/octokat.js'
    ]
  },
  output: {
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]',
    library: 'Octokat',
    libraryTarget: 'umd',
    path: 'dist',
    filename: '[name].js'
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
