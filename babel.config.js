module.exports = {
  plugins: [
    "@emotion/babel-plugin",
    [
      "babel-plugin-react-intl",
      {
        idInterpolationPattern: "[sha512:contenthash:base64:6]",
      },
    ],
  ],
  presets: [
    "@babel/preset-env",
    [
      "@babel/preset-react",
      {
        importSource: "@emotion/react",
        runtime: "automatic",
      },
    ],
    "@babel/preset-typescript",
  ],
};
