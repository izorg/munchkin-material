/* eslint-env node */

const plugins = [
  "@emotion/babel-plugin",
  [
    "babel-plugin-polyfill-corejs3",
    {
      method: "usage-global",
      version: "3.30",
    },
  ],
];

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

const config = {
  plugins,
};

export default config;
