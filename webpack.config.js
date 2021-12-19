const path = require("path");

const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const SentryWebpackPlugin = require("@sentry/webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { GenerateSW } = require("workbox-webpack-plugin");

const { version } = require("./package.json");

const cordova = process.env.BUILD === "cordova";
const dev = process.env.NODE_ENV === "development";
const prod = process.env.NODE_ENV === "production";
const web = process.env.BUILD === "web";

const outputPath = path.resolve(__dirname, cordova ? "cordova/www" : "web");

const ids = process.env.STATS || dev ? "named" : "deterministic";

module.exports = {
  devServer: {
    client: {
      overlay: true,
    },
    compress: true,
    historyApiFallback: true,
    host: "0.0.0.0",
    port: 3000,
  },

  devtool:
    (dev && "eval-source-map") ||
    (cordova && "inline-source-map") ||
    "source-map",

  entry:
    (dev && "./src/dev/index.js") ||
    (web && "./src/web.tsx") ||
    "./src/cordova.tsx",

  mode: process.env.NODE_ENV,

  module: {
    rules: [
      {
        exclude: [
          // https://stackoverflow.com/questions/57361439/how-to-exclude-core-js-using-usebuiltins-usage
          /\bcore-js\b/,
          /\bwebpack\/buildin\b/,
        ],
        test: /\.([cm]?js|[jt]sx?)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: dev,
              plugins: [
                prod && [
                  "babel-plugin-react-remove-properties",
                  {
                    properties: ["data-screenshots"],
                  },
                ],
                prod && "babel-plugin-transform-react-remove-prop-types",
                dev && "react-refresh/babel",
              ].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              esModule: false,
              sources: {
                urlFilter: (attribute, value) => !value.startsWith("/"),
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
            },
          },
          {
            loader: "extract-loader",
          },
          {
            loader: "css-loader",
            options: {
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.woff2?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts",
            },
          },
        ],
      },
    ],
  },

  optimization: {
    chunkIds: ids,
    moduleIds: ids,
  },

  output: {
    filename: "js/[name].js",
    path: outputPath,
    publicPath: web ? "/" : "",
  },

  plugins: [
    new CleanWebpackPlugin({
      verbose: false,
    }),

    web &&
      new CopyPlugin({
        patterns: [
          {
            context: "src/static",
            from: "**/*",
          },
        ],
      }),

    new HtmlWebpackPlugin({
      template: cordova ? "src/cordova.html" : "src/web.html",
    }),

    cordova &&
      new HtmlWebpackTagsPlugin({
        append: false,
        tags: ["cordova.js"],
      }),

    dev && new ReactRefreshWebpackPlugin(),

    !dev && web && new GenerateSW(),

    process.env.CI === "true" &&
      new SentryWebpackPlugin({
        deploy: {
          env: "production",
        },
        include: outputPath,
        org: "viacheslav",
        project: "munchkin",
        release: version,
      }),

    process.env.STATS &&
      new BundleAnalyzerPlugin({
        analyzerHost: "localhost",
        analyzerPort: 3001,
        defaultSizes: "gzip",
      }),
  ].filter(Boolean),

  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
  },
};
