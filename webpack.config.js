const path = require('path');

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WebpackNotifierPlugin = require('webpack-notifier');
const { GenerateSW } = require('workbox-webpack-plugin');

const dev = process.env.NODE_ENV === 'development';
const cordova = process.env.BUILD === 'cordova';
const web = process.env.BUILD === 'web';

const outputPath = path.resolve(__dirname, cordova ? 'cordova/www' : 'web');

let entry = './src/cordova.jsx';

if (web) {
  entry = './src/pwa.jsx';
}

if (dev) {
  entry = './src/dev/index.js';
}

module.exports = {
  mode: process.env.NODE_ENV,

  devtool: 'source-map',

  entry,

  output: {
    filename: 'js/[name].js',
    path: outputPath,
    publicPath: web ? '/' : '',
  },

  resolve: {
    extensions: ['.mjs', '.jsx', '.js', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: /node_modules\/(react-intl|react-use-gesture)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: dev,
            },
          },
        ],
      },
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: dev,
              plugins: [dev && 'react-refresh/babel'].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attributes: {
                list: [
                  {
                    tag: 'link',
                    attribute: 'href',
                    type: 'src',
                  },
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
          {
            loader: 'extract-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.woff2?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts',
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

    web &&
      new CopyPlugin({
        patterns: [
          {
            context: 'src/static',
            from: '**/*',
          },
        ],
      }),

    new webpack.HashedModuleIdsPlugin(),

    new HtmlWebpackPlugin({
      template: cordova ? 'src/cordova.html' : 'src/pwa.html',
    }),

    cordova &&
      new HtmlWebpackTagsPlugin({
        append: false,
        tags: ['cordova.js'],
      }),

    dev && new ReactRefreshWebpackPlugin(),

    new WebpackNotifierPlugin({
      alwaysNotify: true,
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
