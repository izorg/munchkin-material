/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */
const fs = require("node:fs");
const path = require("node:path");

const launcherFolders = [
  "mipmap-hdpi-v26",
  "mipmap-ldpi-v26",
  "mipmap-mdpi-v26",
  "mipmap-xhdpi-v26",
  "mipmap-xxhdpi-v26",
  "mipmap-xxxhdpi-v26",
];

module.exports = async (ctx) => {
  const { projectRoot } = ctx.opts;

  await Promise.all(
    launcherFolders.map((folder) =>
      fs.promises.unlink(
        path.join(
          projectRoot,
          `platforms/android/app/src/main/res/${folder}/ic_launcher.xml`
        )
      )
    )
  );
};
