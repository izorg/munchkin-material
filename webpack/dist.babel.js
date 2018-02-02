import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';

import CleanWebpackPlugin from 'clean-webpack-plugin';

import common from './common.babel';

const config = merge.smart(common, {
  entry: ['./polyfill.js', './index.jsx'],

  output: {
    filename: 'js/app.js',
    library: 'munchkin',
    path: path.resolve(__dirname, '../dist'),
  },

  plugins: [
    new CleanWebpackPlugin(path.resolve(__dirname, '../dist'), {
      allowExternal: true,
    }),

    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),

    new webpack.optimize.UglifyJsPlugin(),
  ],
});

export default config;
