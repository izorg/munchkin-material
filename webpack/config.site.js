const CnameWebpackPlugin = require('cname-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const config = require('./config.production.js');

module.exports = merge.smartStrategy({
  entry: 'prepend',
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
          name: '[name].[hash].[ext]',
          outputPath: 'fonts/',
        },
      },
    ],
  },

  plugins: [
    new OfflinePlugin({
      caches: {
        main: [
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
      minChunks: module => module.context && module.context.indexOf('node_modules') !== -1,
    }),
  ],
});
