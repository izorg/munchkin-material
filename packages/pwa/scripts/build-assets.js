import fs from "node:fs";
import path from "node:path";

import Handlebars from "handlebars";

export const getDirection = (locale) =>
  ["he"].includes(locale) ? "rtl" : "ltr";

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
        with: {
          type: "json",
        },
      }
    );

    const folder = path.resolve(
      "src/localized-files",
      locale.toLowerCase().replace("-", "_"),
    );

    await fs.promises.mkdir(folder, {
      recursive: true,
    });

    const assetPromises = [
      fs.promises.writeFile(
        path.join(folder, "index.html"),
        htmlTemplate({
          ...data,
          dir: getDirection(locale),
          lang: locale,
          root: "../../",
          webRoot: "../../../../web/src/",
        }),
      ),
      fs.promises.writeFile(
        path.join(folder, "manifest.webmanifest"),
        manifestTemplate({
          ...data,
          root: "../../",
          webRoot: "../../../../web/src/",
        }),
      ),
    ];

    if (locale === "en") {
      assetPromises.push(
        fs.promises.writeFile(
          path.resolve("src/index.html"),
          htmlTemplate({
            ...data,
            dir: getDirection(locale),
            lang: locale,
            root: "./",
            webRoot: "../../web/src/",
          }),
        ),
        fs.promises.writeFile(
          path.resolve("src/manifest.webmanifest"),
          manifestTemplate({
            ...data,
            webRoot: "../../web/src/",
          }),
        ),
      );
    }

    return Promise.all(assetPromises);
  }),
);
