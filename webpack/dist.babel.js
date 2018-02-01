import merge from 'webpack-merge';
import path from 'path';
import webpack from 'webpack';

import common from './common.babel';

const config = merge.smart(common, {
  entry: [
    './polyfill.js',
    './index.jsx',
  ],

  output: {
    filename: 'js/app.js',
    library: 'munchkin',
    path: path.resolve(__dirname, '../dist'),
  },

  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),

    new webpack.optimize.UglifyJsPlugin(),
  ],
});

export default config;
