import parcelBabelPresetEnv from "@parcel/babel-preset-env";
import sentryBabelPluginComponentAnnotate from "@sentry/babel-plugin-component-annotate";

const babelPresetWeb = () => ({
  plugins: [sentryBabelPluginComponentAnnotate],
  presets: [
    [
      parcelBabelPresetEnv,
      {
        corejs: "3.45",
      },
    ],
  ],
});

export default babelPresetWeb;
