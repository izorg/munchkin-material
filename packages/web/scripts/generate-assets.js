import fs from "node:fs";
import path from "node:path";

import Handlebars from "handlebars";

export const getDirection = (locale) =>
  ["he"].includes(locale) ? "rtl" : "ltr";

export const getRoot = (locale) => (locale === "en" ? "" : "../../");

/**
 * @param {string} templatePath
 * @return {Promise<Handlebars.TemplateDelegate<unknown>>}
 */
const getTemplate = async (templatePath) => {
  const file = await fs.promises.readFile(path.resolve(templatePath));

  return Handlebars.compile(file.toString());
};

const [htmlTemplate, manifestTemplate] = await Promise.all([
  getTemplate("src/templates/markup/index.html.hbs"),
  getTemplate("src/templates/markup/manifest.webmanifest.hbs"),
]);

const languagesDir = await fs.promises.readdir(
  path.resolve("src/templates/data"),
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
        ? path.resolve("src")
        : path.resolve(
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
