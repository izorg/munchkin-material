/* eslint-disable @typescript-eslint/no-require-imports,unicorn/prefer-module -- CJS module */
const fs = require("node:fs");
const path = require("node:path");

const copyGradleExtras = async (ctx) => {
  const { projectRoot } = ctx.opts;

  await fs.promises.copyFile(
    path.join(projectRoot, "res/android/build-extras.gradle"),
    path.join(projectRoot, "platforms/android/app/build-extras.gradle"),
  );
};

module.exports = copyGradleExtras;
/* eslint-enable @typescript-eslint/no-require-imports,unicorn/prefer-module */
