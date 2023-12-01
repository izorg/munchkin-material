// @ts-check

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import Handlebars from "handlebars";

export const getDirection = (locale) =>
  ["he"].includes(locale) ? "rtl" : "ltr";

export const getRoot = (locale) => (locale === "en" ? "" : "../../");

const [htmlTemplateFile, manifestFile] = await Promise.all([
  fs.promises.readFile(
    path.join(process.cwd(), "src/templates/markup/index.html.hbs"),
  ),
  fs.promises.readFile(
    path.join(process.cwd(), "src/templates/markup/manifest.webmanifest.hbs"),
  ),
]);

const htmlTemplate = Handlebars.compile(htmlTemplateFile.toString());
const manifestTemplate = Handlebars.compile(manifestFile.toString());

const languagesDir = await fs.promises.readdir(
  path.join(process.cwd(), "src/templates/data"),
);

const locales = languagesDir
  .filter((entry) => entry.endsWith(".json"))
  .map(
    /**
     * @param {string} name
     */
    (name) => name.split(".").at(0),
  );

await Promise.all(
  locales.map(async (locale) => {
    const { default: data } = await import(
      `../src/templates/data/${locale}.json`,
      {
        assert: {
          type: "json",
        },
      }
    );

    const folder =
      locale === "en"
        ? path.join(process.cwd(), "src")
        : path.join(
            process.cwd(),
            "src/localized-files",
            locale.toLowerCase().replace("-", "_"),
          );

    await fs.promises.mkdir(folder, {
      recursive: true,
    });

    await Promise.all([
      fs.promises.writeFile(
        path.join(folder, "index.html"),
        htmlTemplate({
          ...data,
          dir: getDirection(locale),
          lang: locale,
          root: getRoot(locale),
        }),
      ),
      fs.promises.writeFile(
        path.join(folder, "manifest.webmanifest"),
        manifestTemplate({
          ...data,
          root: getRoot(locale),
        }),
      ),
    ]);
  }),
);
