var path = require('path');

module.exports = {
  cache: true,
  entry: {
    octokat: [
      './src/octokat.coffee',
    ]
  },
  output: {
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
      { test: /\.coffee$/, loader: 'coffee-loader' }
    ]
  },
  resolve: {
    alias: {
      xmlhttprequest: path.join(__dirname, 'src/hacks/xmlhttprequest-filler-browser.js'),
      'es6-promise': path.join(__dirname, 'src/hacks/promise-filler-browser.js'),
    },
    extensions: ['', '.js', '.coffee']
  }
};
