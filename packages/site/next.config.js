// @ts-check

import bundleAnalyzer from "@next/bundle-analyzer";
import { withSentryConfig } from "@sentry/nextjs";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  eslint: {
    // Using project root ESLint check
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  output: "export",
  productionBrowserSourceMaps: true,
  typescript: {
    // Using project root TypeScript check
    ignoreBuildErrors: true,
  },
  webpack: (config, { dev }) => {
    if (!dev) {
      Object.assign(config.resolve.alias, {
        "@formatjs/icu-messageformat-parser":
          "@formatjs/icu-messageformat-parser/no-parser",
      });
    }

    return config;
  },
};

export default withSentryConfig(
  withBundleAnalyzer(nextConfig),
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    dryRun: process.env.CI !== "true",
    org: "viacheslav",
    project: "munchkin-site",
    // Suppresses source map uploading logs during build
    silent: true,
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,
  },
);