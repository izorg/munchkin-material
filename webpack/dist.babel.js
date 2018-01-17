import webpack from 'webpack';
import merge from 'webpack-merge';

import config from './common.babel';

export default merge.strategy({
  'module.rules': 'prepend',
})(config, {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'string-replace-loader',
        options: {
          search: 'webpackMode: "lazy"',
          replace: 'webpackMode: "eager"',
        },
      },
    ],
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
});
