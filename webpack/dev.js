const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const merge = require('webpack-merge');

const config = require('./common.js');

module.exports = merge.strategy({
  entry: 'replace',
})(config, {
  devtool: 'eval-source-map',

  entry: [
    'babel-polyfill',
    './src/site.js',
    './src/test/index.js',
    './src/index.jsx',
  ],

  output: {
    chunkFilename: '[name].js',
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              emitError: false,
              emitWarning: true,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new webpack.NamedModulesPlugin(),

    new WebpackNotifierPlugin(),

    new CopyWebpackPlugin([
      { from: './src/manifest.json' },
    ]),
  ],

  devServer: {
    hot: true,
    overlay: true,
  },
});
