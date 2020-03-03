const path = require('path');

const outputPath = path.resolve(__dirname, 'www/js');

module.exports = {
  mode: process.env.NODE_ENV,

  devtool: 'source-map',

  entry: './index.js',

  context: path.resolve(__dirname, './src'),

  output: {
    filename: 'index.js',
    path: outputPath,
    publicPath: '',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
