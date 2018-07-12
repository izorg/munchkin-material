const path = require('path');

const { compact } = require('lodash');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CnameWebpackPlugin = require('cname-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WebpackNotifierPlugin = require('webpack-notifier');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const dev = process.env.NODE_ENV === 'development';
const dist = process.env.BUILD === 'dist';
const site = process.env.BUILD === 'site';

const manifest = {
  background_color: '#FFFFFF',
  display: 'standalone',
  fingerprints: !dev && site,
  icons: [
    {
      destination: path.join('images'),
      sizes: [192, 256, 384, 512],
      src: path.resolve('src/images/icon-512x512.png'),
    },
  ],
  inject: false,
  orientation: 'any',
  theme_color: '#000000',
};

const outputPath = path.resolve(__dirname, dist ? 'dist' : 'site');

module.exports = {
  mode: process.env.NODE_ENV,

  devtool: dev && 'eval-source-map',

  entry: compact([
    './polyfill.js',
    !dev && site && './offline.js',
    site && './site.js',
    dev && './dev/index.js',
    './index.jsx',
  ]),

  context: path.resolve(__dirname, './src'),

  output: {
    filename: dev || dist ? 'js/[name].js' : 'js/[name].[chunkhash].js',
    library: 'MunchkinApp',
    libraryExport: 'default',
    path: outputPath,
    publicPath: '',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: compact([
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    targets: {
                      android: '4.4',
                      chrome: 49,
                      edge: 14,
                      firefox: 45,
                      ie: 11,
                      safari: 10,
                    },
                    /*
                     * Have to use `entry` instead of `usage` cause of
                     * Android 4.4 support
                     */
                    useBuiltIns: 'entry',
                  },
                ],
              ],
            },
          },
          dev && {
            loader: 'eslint-loader',
            options: {
              emitError: false,
              emitWarning: true,
            },
          },
        ]),
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: dev || dist ? '[name].[ext]' : '[name].[hash].[ext]',
          outputPath: 'fonts/',
          publicPath: 'fonts/',
        },
      },
    ],
  },

  optimization: site
    ? {
        splitChunks: {
          maxAsyncRequests: 1,
        },
      }
    : undefined,

  plugins: compact([
    !dev && new CleanWebpackPlugin(outputPath),

    dev && new webpack.HotModuleReplacementPlugin(),

    !dev && new webpack.HashedModuleIdsPlugin(),

    dev && new WebpackNotifierPlugin(),

    dist &&
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),

    !dev &&
      site &&
      new CnameWebpackPlugin({
        domain: 'web.allmunchkins.com',
      }),

    new WebpackPwaManifest({
      ...manifest,
      filename: 'manifest.json',
      name: 'Munchkin Level Counter',
      short_name: 'Munchkin',
      start_url: '/',
    }),

    site &&
      new WebpackPwaManifest({
        ...manifest,
        filename: 'manifest-ru.json',
        name: 'Манчкин - счётчик уровней',
        short_name: 'Манчкин',
        start_url: '/ru.html',
      }),

    new HtmlWebpackPlugin({
      favicon: './images/favicon.png',
      manifest: 'manifest.json',
      template: './index.ejs',
      title: 'Munchkin Level Counter',
    }),

    site &&
      new HtmlWebpackPlugin({
        favicon: './images/favicon.png',
        filename: 'ru.html',
        manifest: 'manifest-ru.json',
        template: './index.ejs',
        title: 'Манчкин - счётчик уровней',
      }),

    !dev &&
      site &&
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

    process.env.STATS &&
      new BundleAnalyzerPlugin({
        analyzerPort: 3001,
        defaultSizes: 'gzip',
      }),
  ]),

  devServer: {
    compress: true,
    disableHostCheck: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: dev,
    inline: dev,
    overlay: true,
    port: 3000,
    publicPath: '/',
    stats: {
      colors: true,
      progress: true,
    },
  },
};
