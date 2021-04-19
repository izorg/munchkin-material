module.exports = {
  plugins: [
    "@emotion/babel-plugin",
    [
      "babel-plugin-react-intl",
      {
        idInterpolationPattern: "[contenthash:5]",
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
  ],
};
