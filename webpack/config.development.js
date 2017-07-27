const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const merge = require('webpack-merge');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const srcPath = path.resolve(__dirname, '../src');
const config = require('./config.common.js');

module.exports = merge.strategy({
  entry: 'prepend',
})(config, {
  devtool: 'eval-source-map',

  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    './src/site.js',
    './src/test/index.js',
  ],

  output: {
    filename: 'app.[hash].js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          srcPath,
        ],
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
    new StyleLintPlugin({
      files: ['./src/**/*.css'],
    }),
    new CopyWebpackPlugin([
      { from: './src/manifest.json' },
    ]),
  ],

  devServer: {
    hot: true,
  },
});
