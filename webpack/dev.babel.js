import CopyWebpackPlugin from 'copy-webpack-plugin';
import merge from 'webpack-merge';
import path from 'path';
import webpack from 'webpack';
import WebpackNotifierPlugin from 'webpack-notifier';

import common from './common.babel';

const config = merge.smart(common, {
  devtool: 'eval-source-map',

  entry: [
    './src/polyfill.js',
    './src/site.js',
    './src/test/index.js',
    './src/index.jsx',
  ],

  output: {
    chunkFilename: '[name].js',
    filename: '[name].js',
    path: path.resolve(__dirname, '../dev'),
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

export default config;
