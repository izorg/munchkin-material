/* eslint-env node */

const prod = process.env.NODE_ENV === "production";

const plugins = [
  prod && "babel-plugin-transform-react-remove-prop-types",
  prod && [
    "babel-plugin-react-remove-properties",
    {
      properties: ["data-screenshots"],
    },
  ],
  prod && [
    "babel-plugin-formatjs",
    {
      removeDefaultMessage: true,
    },
  ],
  "@emotion/babel-plugin",
  [
    "babel-plugin-polyfill-corejs3",
    {
      method: "usage-global",
      version: "3.29",
    },
  ],
].filter(Boolean);

export default {
  plugins,
};
