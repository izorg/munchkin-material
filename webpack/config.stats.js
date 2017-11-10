const merge = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const config = require('./config.site.js');

module.exports = merge(config, {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerPort: 3001,
    }),
  ],
});
