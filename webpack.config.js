const path = require('path');

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WebpackNotifierPlugin = require('webpack-notifier');
const { GenerateSW } = require('workbox-webpack-plugin');

const dev = process.env.NODE_ENV === 'development';
const cordova = process.env.BUILD === 'cordova';
const web = process.env.BUILD === 'web';

const outputPath = path.resolve(__dirname, cordova ? 'cordova/www' : 'web');

let entry = './src/cordova.jsx';

if (web) {
  entry = './src/web.jsx';
}

if (dev) {
  entry = './src/dev/index.js';
}

module.exports = {
  devServer: {
    compress: true,
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

  devtool: cordova ? 'inline-source-map' : 'source-map',

  entry,

  mode: process.env.NODE_ENV,

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.m?jsx?$/,
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
                    attribute: 'href',
                    tag: 'link',
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

  optimization: {
    chunkIds: process.env.STATS || dev ? 'named' : 'deterministic',
    moduleIds: process.env.STATS || dev ? 'named' : 'deterministic',
  },

  output: {
    filename: 'js/[name].js',
    path: outputPath,
    publicPath: web ? '/' : '',
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

    new HtmlWebpackPlugin({
      template: cordova ? 'src/cordova.html' : 'src/web.html',
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

  resolve: {
    extensions: ['.mjs', '.jsx', '.js', '.json'],
  },

  target: 'web',
};
