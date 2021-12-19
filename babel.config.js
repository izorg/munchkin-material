module.exports = {
  plugins: [
    "@babel/plugin-transform-runtime",
    "@emotion/babel-plugin",
    [
      "babel-plugin-polyfill-corejs3",
      {
        method: "usage-global",
      },
    ],
    "babel-plugin-react-intl",
  ],
  presets: [
    [
      "@babel/preset-env",
      {
        loose: true,
      },
    ],
    [
      "@babel/preset-react",
      {
        importSource: "@emotion/react",
        runtime: "automatic",
      },
    ],
    "@babel/preset-typescript",
  ],
  sourceType: "unambiguous",
};
