const path = require('path');

const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CnameWebpackPlugin = require('cname-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WebpackNotifierPlugin = require('webpack-notifier');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');

const dev = process.env.NODE_ENV === 'development';
const dist = process.env.BUILD === 'dist';
const site = process.env.BUILD === 'site';

const outputPath = path.resolve(__dirname, dist ? 'dist' : 'site');

module.exports = {
  mode: process.env.NODE_ENV,

  devtool: dev && 'eval-source-map',

  entry: [
    './polyfill.js',
    site ? './site/index.js' : './index.jsx',
    dev && site && './dev/index.js',
  ].filter(Boolean),

  context: path.resolve(__dirname, './src'),

  output: {
    filename: dev || dist ? 'js/[name].js' : 'js/[name].[chunkhash].js',
    library: dist ? 'MunchkinApp' : undefined,
    libraryExport: 'default',
    path: outputPath,
    publicPath: site ? '/' : '',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: /node_modules/,
        loader: 'react-hot-loader/webpack',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
          dev && {
            loader: 'eslint-loader',
            options: {
              emitError: false,
              emitWarning: true,
            },
          },
        ].filter(Boolean),
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: dev || dist ? '[name].[ext]' : '[name].[hash].[ext]',
          outputPath: 'fonts/',
          publicPath: site ? '/fonts/' : 'fonts/',
        },
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: dev || dist ? '[name].[ext]' : '[name].[hash].[ext]',
              outputPath: 'images/',
              publicPath: site ? '/images/' : 'images/',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              disable: dev,
            },
          },
        ],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          attrs: ['link:href'],
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(outputPath, {
      verbose: false,
    }),

    !dev &&
      site &&
      new CnameWebpackPlugin({
        domain: 'web.allmunchkins.com',
      }),

    !dev && new webpack.HashedModuleIdsPlugin(),

    new WebpackNotifierPlugin(),

    dist &&
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),

    site &&
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './index.html',
      }),

    site &&
      new WebpackPwaManifest({
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
        inject: true,
        name: 'Munchkin Level Counter',
        orientation: 'any',
        short_name: 'Munchkin',
        theme_color: '#000000',
        start_url: '/',
      }),

    !dev &&
      site &&
      new InjectManifest({
        exclude: ['CNAME'],
        precacheManifestFilename: 'js/precache-manifest.[manifestHash].js',
        swSrc: path.resolve(__dirname, './src/site/service-worker.js'),
      }),

    process.env.STATS &&
      new BundleAnalyzerPlugin({
        analyzerPort: 3001,
        defaultSizes: 'gzip',
      }),
  ].filter(Boolean),

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
};
