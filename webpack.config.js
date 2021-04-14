const path = require("path");

const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { GenerateSW } = require("workbox-webpack-plugin");

const dev = process.env.NODE_ENV === "development";
const cordova = process.env.BUILD === "cordova";
const web = process.env.BUILD === "web";

const outputPath = path.resolve(__dirname, cordova ? "cordova/www" : "web");

let devtool = "source-map";
let entry = "./src/cordova.jsx";

if (cordova) {
  devtool = "inline-source-map";
}

if (web) {
  entry = ["./src/web.jsx"];

  if (!dev) {
    entry.unshift("./src/sentry.js");
  }
}

if (dev) {
  devtool = "eval-source-map";
  entry = "./src/dev/index.js";
}

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

  devtool,

  entry,

  mode: process.env.NODE_ENV,

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: dev,
              plugins: [dev && "react-refresh/babel"].filter(Boolean),
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

    new CopyPlugin({
      patterns: [
        web && {
          context: "src/static",
          from: "**/*",
        },
        {
          from: "languages",
          to: "languages",
        },
      ].filter(Boolean),
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

    process.env.STATS &&
      new BundleAnalyzerPlugin({
        analyzerHost: "localhost",
        analyzerPort: 3001,
        defaultSizes: "gzip",
      }),
  ].filter(Boolean),

  resolve: {
    extensions: [".mjs", ".jsx", ".js", ".json"],
  },
};
