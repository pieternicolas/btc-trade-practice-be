const path = require('path');
const BabiliPlugin = require('babili-webpack-plugin');

const DIST_DIR   = path.join(__dirname, 'dist'),
      DEV_DIR = path.join(__dirname, 'src');

module.exports = {
  context: DEV_DIR,

  entry: [
    path.join(DEV_DIR, 'server.js')
  ],

  output: {
    path: DIST_DIR,
    filename: "server.min.js"
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['env'],
          plugins: ['transform-runtime','babel-plugin-root-import']
        }
      }
    ]
  },

  plugins: [
    new BabiliPlugin({
      mangle: false
    })
  ],

  target: 'node',

  node: {
    fs: 'empty',
    net: 'empty',
    module: 'empty',
    tls: 'empty',
    vertx: 'empty'
  }
};