/* eslint-env node */
const path = require("path");

const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { GenerateSW } = require("workbox-webpack-plugin");

const dev = process.env.NODE_ENV === "development";
const prod = process.env.NODE_ENV === "production";

const outputPath = path.resolve(__dirname, "web");

const ids = process.env.ANALYZE || dev ? "named" : "deterministic";

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

  devtool: dev ? "eval-source-map" : "source-map",

  entry: "./src/index.tsx",

  mode: process.env.NODE_ENV,

  module: {
    rules: [
      {
        exclude: /\b(core-js|webpack\/buildin)\b/, // https://stackoverflow.com/questions/57361439/how-to-exclude-core-js-using-usebuiltins-usage
        test: /\.([cm]js|[jt]sx?)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: dev,
              plugins: [
                prod && [
                  "babel-plugin-formatjs",
                  {
                    removeDefaultMessage: true,
                  },
                ],
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
    publicPath: "/",
  },

  plugins: [
    new CleanWebpackPlugin({
      verbose: false,
    }),

    new CopyPlugin({
      patterns: [
        {
          context: "src/static",
          from: "**/*",
        },
      ],
    }),

    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),

    dev && new ReactRefreshWebpackPlugin(),

    !dev && new GenerateSW(),

    process.env.ANALYZE &&
      new BundleAnalyzerPlugin({
        analyzerHost: "localhost",
        analyzerPort: 3001,
        defaultSizes: "gzip",
      }),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@formatjs/icu-messageformat-parser":
        "@formatjs/icu-messageformat-parser/no-parser",
    },
    extensions: [".tsx", ".ts", ".js"],
  },
};
