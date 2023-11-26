// @ts-check

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import { createIntl } from "@formatjs/intl";
import Handlebars from "handlebars";

export const getDirection = (locale) =>
  ["he"].includes(locale) ? "rtl" : "ltr";

const templateFile = await fs.promises.readFile(
  path.join(process.cwd(), "src/templates/html/index.html.hbs"),
);

const template = Handlebars.compile(templateFile.toString());

const languagesDir = await fs.promises.readdir(
  path.join(process.cwd(), "src/templates/locales"),
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
    const { default: messages } = await import(
      `../src/templates/locales/${locale}.json`,
      {
        assert: {
          type: "json",
        },
      }
    );

    const intl = createIntl({
      locale,
      messages,
    });

    const folder = path.join(
      process.cwd(),
      "src/localized-files",
      locale.toLowerCase().replace("-", "_"),
    );

    await fs.promises.mkdir(folder, {
      recursive: true,
    });

    await fs.promises.writeFile(
      path.join(folder, "index.html"),
      template({
        dir: getDirection(locale),
        lang: locale,
        title: intl.formatMessage({ id: "title" }),
      }),
    );
  }),
);
