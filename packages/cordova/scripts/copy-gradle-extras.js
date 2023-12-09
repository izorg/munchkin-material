/* eslint-disable @typescript-eslint/no-var-requires,unicorn/prefer-module */
/* eslint-env node */
const fs = require("node:fs");
const path = require("node:path");

module.exports = async (ctx) => {
  const { projectRoot } = ctx.opts;

  await fs.promises.copyFile(
    path.join(projectRoot, "res/android/build-extras.gradle"),
    path.join(projectRoot, "platforms/android/app/build-extras.gradle"),
  );
};
