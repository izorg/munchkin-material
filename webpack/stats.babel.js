import merge from 'webpack-merge';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import site from './site.babel';

export default merge(site, {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerPort: 3001,
      defaultSizes: 'gzip',
    }),
  ],
});
