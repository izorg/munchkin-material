const path = require('path');

const webpack = require('webpack');

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WebpackNotifierPlugin = require('webpack-notifier');
const { GenerateSW } = require('workbox-webpack-plugin');

const dev = process.env.NODE_ENV === 'development';
const cordova = process.env.BUILD === 'cordova';
const web = process.env.BUILD === 'web';

const outputPath = path.resolve(__dirname, cordova ? 'cordova/www' : 'web');

let entry = './src/cordova.js';

if (web) {
  entry = './src/site/index.js';
}

if (dev) {
  entry = './src/dev/index.js';
}

module.exports = {
  mode: process.env.NODE_ENV,

  devtool: 'source-map',

  entry,

  output: {
    chunkFilename: dev || cordova ? 'js/[name].js' : 'js/[name].[chunkhash].js',
    filename: 'js/[name].js',
    path: outputPath,
    publicPath: web ? '/' : '',
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: /node_modules\/react-intl/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins: [dev && 'react-refresh/babel'].filter(Boolean),
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin({
      verbose: false,
    }),

    new CopyPlugin(
      [
        { from: 'src/static/fonts', to: 'fonts' },
        web && { from: 'src/static/images', to: 'images' },
        web && { from: 'src/static/manifest.json', to: 'manifest.json' },
        web && { from: 'src/static/web.html', to: 'index.html' },
        cordova && { from: 'src/static/cordova.html', to: 'index.html' },
      ].filter(Boolean),
    ),

    new webpack.HashedModuleIdsPlugin(),

    dev &&
      new ReactRefreshWebpackPlugin({
        disableRefreshCheck: true,
      }),

    new WebpackNotifierPlugin({
      alwaysNotify: true,
    }),

    cordova &&
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),

    !dev && web && new GenerateSW(),

    process.env.STATS &&
      new BundleAnalyzerPlugin({
        analyzerHost: 'localhost',
        analyzerPort: 3001,
        defaultSizes: 'gzip',
      }),
  ].filter(Boolean),

  devServer: {
    compress: true,
    contentBase: outputPath,
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: dev,
    inline: dev,
    overlay: true,
    port: 3000,
    stats: {
      colors: true,
      progress: true,
    },
    watchContentBase: true,
  },
};
