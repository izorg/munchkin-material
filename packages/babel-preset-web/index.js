const babelPresetWeb = () => ({
  plugins: [
    "babel-plugin-react-compiler",
    "@sentry/bundler-plugins/babel-plugin",
  ],
  presets: [
    [
      "@parcel/babel-preset-env",
      {
        corejs: "3.51",
      },
    ],
  ],
});

export default babelPresetWeb;
