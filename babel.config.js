const packageJson = require("./package.json");

module.exports = {
  compact: false,
  plugins: [
    "@babel/plugin-transform-runtime",
    "@emotion/babel-plugin",
    [
      "babel-plugin-polyfill-corejs3",
      {
        method: "usage-global",
        version: packageJson.dependencies["core-js"],
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
