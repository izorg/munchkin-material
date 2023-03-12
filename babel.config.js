/* eslint-env node */

const plugins = ["@emotion/babel-plugin"];

if (process.env.NODE_ENV === "production") {
  plugins.push(
    "babel-plugin-transform-react-remove-prop-types",
    [
      "babel-plugin-react-remove-properties",
      {
        properties: ["data-screenshots"],
      },
    ],
    [
      "babel-plugin-formatjs",
      {
        removeDefaultMessage: true,
      },
    ]
  );
}

export default {
  plugins,
};
