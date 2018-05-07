import path from 'path';
import webpack from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackPwaManifest from 'webpack-pwa-manifest';

import manifest from './manifest';

export default {
  mode: 'production',

  context: path.resolve(__dirname, '../src'),

  output: {
    library: 'MunchkinApp',
    libraryExport: 'default',
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
        exclude: /node_modules/,
        use: [
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
        ],
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/',
          publicPath: 'fonts/',
        },
      },
    ],
  },

  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),

    new WebpackPwaManifest({
      ...manifest,
      filename: 'manifest.json',
      name: 'Munchkin Level Counter',
      short_name: 'Munchkin',
      start_url: '/',
    }),

    new HtmlWebpackPlugin({
      favicon: './images/favicon.png',
      manifest: 'manifest.json',
      template: './index.ejs',
      title: 'Munchkin Level Counter',
    }),
  ],

  devServer: {
    compress: true,
    disableHostCheck: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    inline: true,
    port: 3000,
    publicPath: '/',
    stats: {
      colors: true,
      progress: true,
    },
  },
};
