import CopyWebpackPlugin from 'copy-webpack-plugin';
import webpack from 'webpack';
import merge from 'webpack-merge';
import WebpackNotifierPlugin from 'webpack-notifier';

import config from './common.babel';

export default merge.strategy({
  entry: 'prepend',
})(config, {
  devtool: 'eval-source-map',

  entry: [
    'babel-polyfill',
    './src/site.js',
    './src/test/index.js',
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
