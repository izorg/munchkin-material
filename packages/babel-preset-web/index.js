const babelPresetWeb = () => ({
  plugins: [
    "babel-plugin-react-compiler",
    "@sentry/babel-plugin-component-annotate",
  ],
  presets: [
    [
      "@parcel/babel-preset-env",
      {
        corejs: "3.48",
      },
    ],
  ],
});

export default babelPresetWeb;
