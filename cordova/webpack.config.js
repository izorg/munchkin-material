/* eslint-env node */

import path from "node:path";
import url from "node:url";

import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const outputPath = path.resolve(__dirname, "www");

export default {
  devtool: "source-map",

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
              cwd: "../",
              plugins: [
                [
                  "babel-plugin-formatjs",
                  {
                    removeDefaultMessage: true,
                  },
                ],
                [
                  "babel-plugin-react-remove-properties",
                  {
                    properties: ["data-screenshots"],
                  },
                ],
                "babel-plugin-transform-react-remove-prop-types",
              ],
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

  output: {
    filename: "js/[name].js",
    path: outputPath,
    publicPath: "",
  },

  plugins: [
    new CleanWebpackPlugin({
      verbose: false,
    }),

    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
  ],

  resolve: {
    alias: {
      "@formatjs/icu-messageformat-parser":
        "@formatjs/icu-messageformat-parser/no-parser",
    },
    extensions: [".tsx", ".ts", ".js"],
  },
};
