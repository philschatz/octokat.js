const path = require('path')

module.exports = {
  cache: true,
  devtool: 'source-map',
  entry: {
    octokat: [
      './dist/node/octokat.js'
    ]
  },
  output: {
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]',
    library: 'Octokat',
    libraryTarget: 'umd',
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.coffee']
  }
}
