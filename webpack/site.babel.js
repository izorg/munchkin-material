import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';

import CleanWebpackPlugin from 'clean-webpack-plugin';
import CnameWebpackPlugin from 'cname-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import OfflinePlugin from 'offline-plugin';
import WebpackPwaManifest from 'webpack-pwa-manifest';

import common from './common.babel';
import manifest from './manifest';

const config = merge.smart(common, {
  entry: ['./polyfill.js', './offline.js', './site.js', './index.jsx'],

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
          publicPath: 'fonts/',
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(path.resolve(__dirname, '../site'), {
      allowExternal: true,
    }),

    new webpack.optimize.UglifyJsPlugin(),

    new CnameWebpackPlugin({
      domain: 'web.allmunchkins.com',
    }),

    new HtmlWebpackPlugin({
      favicon: './images/favicon.png',
      filename: 'ru.html',
      manifest: 'manifest-ru.json',
      template: './index.ejs',
      title: 'Манчкин - счётчик уровней',
    }),

    new WebpackPwaManifest({
      ...manifest,
      filename: 'manifest-ru.json',
      name: 'Манчкин - счётчик уровней',
      short_name: 'Манчкин',
      start_url: '/ru.html',
    }),

    new webpack.HashedModuleIdsPlugin(),

    new OfflinePlugin({
      appShell: '/',
      caches: {
        main: ['*.html', 'js/main.*.js'],
        additional: ['js/*.js', 'fonts/**'],
        optional: [':rest:'],
      },
      excludes: ['CNAME'],
      externals: [
        'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700',
      ],
      safeToUseOptionalCaches: true,
      ServiceWorker: {
        events: true,
      },
    }),
  ],
});

export default config;
