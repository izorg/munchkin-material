/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */
const fs = require("node:fs");
const path = require("node:path");

module.exports = async (ctx) => {
  const { projectRoot } = ctx.opts;

  const buffer = await fs.promises.readFile(
    path.join(projectRoot, "res/windows/CordovaApp.projitems")
  );

  await fs.promises.writeFile(
    path.join(projectRoot, "platforms/windows/CordovaApp.projitems"),
    buffer
  );

  await fs.promises.cp(
    path.join(projectRoot, "res/windows/strings"),
    path.join(projectRoot, "platforms/windows/strings"),
    {
      recursive: true,
    }
  );
};
