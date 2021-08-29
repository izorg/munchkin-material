module.exports = {
  plugins: ["@emotion/babel-plugin", "babel-plugin-react-intl"],
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
