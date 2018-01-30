import CnameWebpackPlugin from 'cname-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import merge from 'webpack-merge';
import OfflinePlugin from 'offline-plugin';
import path from 'path';
import webpack from 'webpack';

import common from './common.babel';

const config = merge.smart(common, {
  entry: [
    './src/polyfill.js',
    './src/offline.js',
    './src/site.js',
    './src/index.jsx',
  ],

  output: {
    chunkFilename: 'js/[name].[chunkhash].js',
    filename: 'js/[name].[chunkhash].js',
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
    new webpack.optimize.UglifyJsPlugin(),

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

    new OfflinePlugin({
      caches: {
        main: [
          '*.html',
          'js/main.*.js',
        ],
        additional: [
          'js/*.js',
          'fonts/**',
        ],
        optional: [
          ':rest:',
        ],
      },
      excludes: [
        'CNAME',
      ],
      safeToUseOptionalCaches: true,
      ServiceWorker: {
        events: true,
      },
    }),
  ],
});

export default config;
