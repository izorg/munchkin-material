const CnameWebpackPlugin = require('cname-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const _ = require('lodash');
const OfflinePlugin = require('offline-plugin');
const path = require('path');
const merge = require('webpack-merge');

const config = require('./config.production.js');

const srcPath = path.resolve(__dirname, '../src');

module.exports = merge({
  customizeArray(a, b, key) {
    if (key === 'entry') {
      return [
        ...b,
        ...a,
      ];
    }

    if (key === 'plugins') {
      const uniques = ['ExtractTextPlugin'];

      const getter = plugin => plugin.constructor && plugin.constructor.name;
      const comparator = plugin => uniques.indexOf(getter(plugin)) >= 0;

      return [
        ..._.differenceWith(a, b, comparator),
        ...b,
      ];
    }

    return undefined;
  },

  customizeObject(a, b, key) {
    if (key === 'module') {
      return merge.smart(a, b);
    }

    return undefined;
  },
})(config, {
  entry: [
    './src/offline.js',
    './src/site.js',
  ],

  output: {
    filename: 'app.[chunkhash].js',
    path: path.resolve(__dirname, '../site'),
  },

  module: {
    rules: [
      {
        test: /\.(woff|woff2)$/,
        loader: 'file-loader',
        options: {
          context: srcPath,
          name: '[path][name].[hash].[ext]',
          publicPath: '',
        },
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin({
      filename: 'app.[contenthash].css',
    }),
    new OfflinePlugin({
      caches: {
        main: [
          '*.css',
          '*.html',
          '*.js',
        ],
        additional: [
          ':rest:',
        ],
      },
      ServiceWorker: {
        events: true,
      },
    }),
    new CnameWebpackPlugin({
      domain: 'web.allmunchkins.com',
    }),
    new CopyWebpackPlugin([
      { from: './src/manifest.json' },
    ]),
  ],
});
