var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './js/main.js',
  output: {
    path: __dirname + '/src/js',
    filename: 'main.js'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loaders: ['json']
      }, {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /js\/pebble/, /pebble\/react-pebble\//],
        loaders: ['babel']
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json'],
    modulesDirectories: [
      'node_modules',
      'js',
      './'
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ]
};
