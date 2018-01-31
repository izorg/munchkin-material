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

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'string-replace-loader',
            options: {
              search: 'webpackMode: "lazy"',
              replace: 'webpackMode: "eager"',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
  ],
});

export default config;
