/* eslint-env node */

import path from "node:path";
import url from "node:url";

import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin"; // eslint-disable-line import/default
import HtmlWebpackPlugin from "html-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { GenerateSW } from "workbox-webpack-plugin";

const dev = process.env.NODE_ENV === "development";
const prod = process.env.NODE_ENV === "production";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const outputPath = path.resolve(__dirname, "web");

const ids = process.env.ANALYZE || dev ? "named" : "deterministic";

export default {
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
