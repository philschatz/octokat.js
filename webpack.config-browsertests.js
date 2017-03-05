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
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  resolve: {
    extensions: ['.js']
  }
}
