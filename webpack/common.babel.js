import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  entry: [
    './src/index.jsx',
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
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  'env',
                  {
                    exclude: [
                      'es6.symbol',
                      'transform-es2015-typeof-symbol',
                    ],
                    targets: {
                      android: '4.4.2',
                      chrome: 49,
                      edge: 14,
                      firefox: 45,
                      ie: 11,
                      safari: 10,
                    },
                    useBuiltIns: true,
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
        },
      },
    ],
  },

  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),

    new HtmlWebpackPlugin({
      favicon: './src/images/favicon.png',
      manifest: 'manifest.json',
      template: './src/index.ejs',
      title: 'All munchkins',
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
