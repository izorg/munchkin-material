const CnameWebpackPlugin = require('cname-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const _ = require('lodash');
const OfflinePlugin = require('offline-plugin');
const path = require('path');
const webpack = require('webpack');
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
    filename: '[name].[chunkhash].js',
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
      filename: '[name].[contenthash].css',
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
      safeToUseOptionalCaches: true,
      ServiceWorker: {
        events: true,
      },
    }),
    new CnameWebpackPlugin({
      domain: 'web.allmunchkins.com',
    }),
    new CopyWebpackPlugin([
      { from: './src/images', to: 'images', ignore: 'favicon.png' },
      { from: './src/manifest.json' },
      { from: './src/manifest-ru.json' },
    ]),
    new HtmlWebpackPlugin({
      favicon: './src/images/favicon.png',
      filename: 'ru.html',
      manifest: 'manifest-ru.json',
      template: './src/index.ejs',
      title: 'Все манчкины',
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: (module) => {
        // This prevents stylesheet resources with the .css extension
        // from being moved from their original chunk to the vendor chunk
        if (module.resource && (/^.*\.css$/).test(module.resource)) {
          return false;
        }

        return module.context && module.context.indexOf('node_modules') !== -1;
      },
    }),
  ],
});
