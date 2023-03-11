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
].filter(Boolean);

export default {
  plugins,
};
