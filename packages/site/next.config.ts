import bundleAnalyzer from "@next/bundle-analyzer";
import { withSentryConfig } from "@sentry/nextjs";
import { type NextConfig } from "next";
import { type Configuration } from "webpack";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Using project root ESLint check
  },
  experimental: {
    typedRoutes: true,
  },
  images: {
    unoptimized: true,
  },
  productionBrowserSourceMaps: true,
  trailingSlash: true,
  transpilePackages: ["@mui/material", "@mui/system", "@mui/utils"],
  typescript: {
    ignoreBuildErrors: true, // Using project root TypeScript check
  },
  webpack: (config: Configuration, { dev }) => {
    if (!dev) {
      if (!config.resolve) {
        config.resolve = {};
      }

      if (!config.resolve.alias) {
        config.resolve.alias = {};
      }

      Object.assign(config.resolve.alias, {
        "@formatjs/icu-messageformat-parser":
          "@formatjs/icu-messageformat-parser/no-parser",
      });
    }

    return config;
  },
};

if (process.env.NODE_ENV === "development") {
  nextConfig.rewrites = () =>
    Promise.resolve([
      {
        destination: "/en",
        source: "/",
      },
    ]);
} else {
  nextConfig.output = "export";
}

export default withSentryConfig(withBundleAnalyzer(nextConfig), {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,
  org: "viacheslav",
  project: "munchkin-site",
  // Suppresses source map uploading logs during build
  silent: true,
  telemetry: false,
  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,
});
