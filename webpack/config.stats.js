const merge = require('webpack-merge');
// eslint-disable-next-line import/no-extraneous-dependencies
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = require('./config.production.js');

module.exports = merge(config, {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerPort: 3001,
    }),
  ],
});
