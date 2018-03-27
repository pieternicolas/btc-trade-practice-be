const path = require('path');
const webpack = require('webpack');

const DIST_DIR = path.join(__dirname, 'dist');
const DEV_DIR = path.join(__dirname, 'src');

module.exports = {
  context: DEV_DIR,

  entry: [
    path.join(DEV_DIR, 'server.js')
  ],

  output: {
    path: DIST_DIR,
    filename: '[name].min.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },

  target: 'node',

  node: {
    fs: 'empty',
    net: 'empty',
    module: 'empty',
    tls: 'empty',
    vertx: 'empty'
  }
};