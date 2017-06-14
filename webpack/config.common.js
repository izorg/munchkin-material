const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dev = process.env.NODE_ENV === 'development';
const srcPath = path.resolve(__dirname, '../src');

module.exports = {
  entry: [
    './src/index',
  ],

  output: {
    filename: 'js/app.js',
    library: 'munchkin',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          srcPath,
        ],
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.css$/,
        exclude: [
          srcPath,
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
            options: {
              sourceMap: dev,
            },
          },
        }),
      },
      {
        test: /\.css$/,
        include: [
          srcPath,
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                modules: true,
                sourceMap: dev,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        }),
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'file-loader',
        options: {
          context: srcPath,
          name: '[path][name].[ext]',
          publicPath: '../',
        },
      },
    ],
  },

  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new ExtractTextPlugin({
      disable: dev,
      filename: 'css/app.css',
    }),
    new HtmlWebpackPlugin({
      favicon: './src/images/favicon.png',
      template: './src/index.ejs',
      title: 'All munchkins',
    }),
  ],

  devServer: {
    compress: true,
    historyApiFallback: true,
    inline: true,
    port: 3000,
    publicPath: '/',
    stats: {
      colors: true,
      progress: true,
    },
  },
};
