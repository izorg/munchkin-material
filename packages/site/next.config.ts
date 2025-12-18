import { withSentryConfig } from "@sentry/nextjs";
import { type NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    typedEnv: true,
  },
  images: {
    unoptimized: true,
  },
  productionBrowserSourceMaps: true,
  reactCompiler: true,
  trailingSlash: true,
  transpilePackages: ["@mui/material", "@mui/system", "@mui/utils"],
  turbopack:
    process.env.NODE_ENV === "development"
      ? undefined
      : {
          resolveAlias: {
            "@formatjs/icu-messageformat-parser":
              "@formatjs/icu-messageformat-parser/no-parser.js",
          },
        },
  typedRoutes: true,
  typescript: {
    ignoreBuildErrors: true, // Using project root TypeScript check
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

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: "viacheslav",
  project: "munchkin-site",
  // Suppresses source map uploading logs during build
  silent: true,
  telemetry: false,
  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,
});
