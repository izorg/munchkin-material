const path = require('path');

const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WebpackNotifierPlugin = require('webpack-notifier');
const { InjectManifest } = require('workbox-webpack-plugin');

const dev = process.env.NODE_ENV === 'development';
const dist = process.env.BUILD === 'dist';
const site = process.env.BUILD === 'site';

const outputPath = path.resolve(__dirname, dist ? 'cordova/www' : 'site');

let entry = './cordova/src/index.js';

if (site) {
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
    chunkFilename: dev || dist ? 'js/[name].js' : 'js/[name].[chunkhash].js',
    filename: 'js/[name].js',
    library: dist ? 'MunchkinApp' : undefined,
    libraryExport: 'default',
    path: outputPath,
    publicPath: site ? '/' : '',
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: /node_modules\/react-dom/,
        use: [
          {
            loader: 'react-hot-loader/webpack',
          },
        ],
      },
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
              plugins: ['react-hot-loader/babel'],
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
        { from: 'static/fonts', to: 'fonts' },
        site && { from: 'static/images', to: 'images' },
        site && { from: 'static/manifest.json', to: 'manifest.json' },
        site && { from: 'static/web.html', to: 'index.html' },
        dist && { from: 'static/cordova.html', to: 'index.html' },
      ].filter(Boolean),
    ),

    new webpack.HashedModuleIdsPlugin(),

    new WebpackNotifierPlugin({
      alwaysNotify: true,
    }),

    dist &&
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),

    !dev &&
      site &&
      new InjectManifest({
        swSrc: path.resolve(__dirname, './src/site/service-worker.js'),
      }),

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
