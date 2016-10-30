const webpack = require('webpack');
const merge = require('webpack-merge');

const config = require('./config.common.js');

module.exports = merge(config, {
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
});
