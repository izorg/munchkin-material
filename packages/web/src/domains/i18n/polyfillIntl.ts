import { shouldPolyfill as shouldPolyfillDateTimeFormat } from "@formatjs/intl-datetimeformat/should-polyfill.js";
import { shouldPolyfill as shouldPolyfillGetCanonicalLocales } from "@formatjs/intl-getcanonicallocales/should-polyfill.js";
import { shouldPolyfill as shouldPolyfillIntlLocale } from "@formatjs/intl-locale/should-polyfill.js";
import { shouldPolyfill as shouldPolyfillNumberFormat } from "@formatjs/intl-numberformat/should-polyfill.js";
import { shouldPolyfill as shouldPolyfillPluralRules } from "@formatjs/intl-pluralrules/should-polyfill.js";

import {
  BE,
  CS,
  DA,
  DE,
  EL,
  EN,
  ES,
  FI,
  FR,
  HE,
  HU,
  HY,
  IT,
  NB,
  NL,
  PL,
  PT,
  PT_BR,
  RU,
  SK,
  type SupportedLocale,
  TR,
  UK,
} from "./supportedLocales";

const pluralRulesLoaders: Record<SupportedLocale, () => unknown> = {
  [BE]: () => import("@formatjs/intl-pluralrules/locale-data/be.js"),
  [CS]: () => import("@formatjs/intl-pluralrules/locale-data/cs.js"),
  [DA]: () => import("@formatjs/intl-pluralrules/locale-data/da.js"),
  [DE]: () => import("@formatjs/intl-pluralrules/locale-data/de.js"),
  [EL]: () => import("@formatjs/intl-pluralrules/locale-data/el.js"),
  [EN]: () => import("@formatjs/intl-pluralrules/locale-data/en.js"),
  [ES]: () => import("@formatjs/intl-pluralrules/locale-data/es.js"),
  [FI]: () => import("@formatjs/intl-pluralrules/locale-data/fi.js"),
  [FR]: () => import("@formatjs/intl-pluralrules/locale-data/fr.js"),
  [HE]: () => import("@formatjs/intl-pluralrules/locale-data/he.js"),
  [HU]: () => import("@formatjs/intl-pluralrules/locale-data/hu.js"),
  [HY]: () => import("@formatjs/intl-pluralrules/locale-data/hy.js"),
  [IT]: () => import("@formatjs/intl-pluralrules/locale-data/it.js"),
  [NB]: () => import("@formatjs/intl-pluralrules/locale-data/nb.js"),
  [NL]: () => import("@formatjs/intl-pluralrules/locale-data/nl.js"),
  [PL]: () => import("@formatjs/intl-pluralrules/locale-data/pl.js"),
  [PT]: () => import("@formatjs/intl-pluralrules/locale-data/pt.js"),
  [PT_BR]: () => import("@formatjs/intl-pluralrules/locale-data/pt.js"),
  [RU]: () => import("@formatjs/intl-pluralrules/locale-data/ru.js"),
  [SK]: () => import("@formatjs/intl-pluralrules/locale-data/sk.js"),
  [TR]: () => import("@formatjs/intl-pluralrules/locale-data/tr.js"),
  [UK]: () => import("@formatjs/intl-pluralrules/locale-data/uk.js"),
};

const numberFormatLoaders: Record<SupportedLocale, () => unknown> = {
  [BE]: () => import("@formatjs/intl-numberformat/locale-data/be.js"),
  [CS]: () => import("@formatjs/intl-numberformat/locale-data/cs.js"),
  [DA]: () => import("@formatjs/intl-numberformat/locale-data/da.js"),
  [DE]: () => import("@formatjs/intl-numberformat/locale-data/de.js"),
  [EL]: () => import("@formatjs/intl-numberformat/locale-data/el.js"),
  [EN]: () => import("@formatjs/intl-numberformat/locale-data/en.js"),
  [ES]: () => import("@formatjs/intl-numberformat/locale-data/es.js"),
  [FI]: () => import("@formatjs/intl-numberformat/locale-data/fi.js"),
  [FR]: () => import("@formatjs/intl-numberformat/locale-data/fr.js"),
  [HE]: () => import("@formatjs/intl-numberformat/locale-data/he.js"),
  [HU]: () => import("@formatjs/intl-numberformat/locale-data/hu.js"),
  [HY]: () => import("@formatjs/intl-numberformat/locale-data/hy.js"),
  [IT]: () => import("@formatjs/intl-numberformat/locale-data/it.js"),
  [NB]: () => import("@formatjs/intl-numberformat/locale-data/nb.js"),
  [NL]: () => import("@formatjs/intl-numberformat/locale-data/nl.js"),
  [PL]: () => import("@formatjs/intl-numberformat/locale-data/pl.js"),
  [PT]: () => import("@formatjs/intl-numberformat/locale-data/pt.js"),
  [PT_BR]: () => import("@formatjs/intl-numberformat/locale-data/pt.js"),
  [RU]: () => import("@formatjs/intl-numberformat/locale-data/ru.js"),
  [SK]: () => import("@formatjs/intl-numberformat/locale-data/sk.js"),
  [TR]: () => import("@formatjs/intl-numberformat/locale-data/tr.js"),
  [UK]: () => import("@formatjs/intl-numberformat/locale-data/uk.js"),
};

const dateTimeFormatLoaders: Record<SupportedLocale, () => unknown> = {
  [BE]: () => import("@formatjs/intl-datetimeformat/locale-data/be.js"),
  [CS]: () => import("@formatjs/intl-datetimeformat/locale-data/cs.js"),
  [DA]: () => import("@formatjs/intl-datetimeformat/locale-data/da.js"),
  [DE]: () => import("@formatjs/intl-datetimeformat/locale-data/de.js"),
  [EL]: () => import("@formatjs/intl-datetimeformat/locale-data/el.js"),
  [EN]: () => import("@formatjs/intl-datetimeformat/locale-data/en.js"),
  [ES]: () => import("@formatjs/intl-datetimeformat/locale-data/es.js"),
  [FI]: () => import("@formatjs/intl-datetimeformat/locale-data/fi.js"),
  [FR]: () => import("@formatjs/intl-datetimeformat/locale-data/fr.js"),
  [HE]: () => import("@formatjs/intl-datetimeformat/locale-data/he.js"),
  [HU]: () => import("@formatjs/intl-datetimeformat/locale-data/hu.js"),
  [HY]: () => import("@formatjs/intl-datetimeformat/locale-data/hy.js"),
  [IT]: () => import("@formatjs/intl-datetimeformat/locale-data/it.js"),
  [NB]: () => import("@formatjs/intl-datetimeformat/locale-data/nb.js"),
  [NL]: () => import("@formatjs/intl-datetimeformat/locale-data/nl.js"),
  [PL]: () => import("@formatjs/intl-datetimeformat/locale-data/pl.js"),
  [PT]: () => import("@formatjs/intl-datetimeformat/locale-data/pt.js"),
  [PT_BR]: () => import("@formatjs/intl-datetimeformat/locale-data/pt.js"),
  [RU]: () => import("@formatjs/intl-datetimeformat/locale-data/ru.js"),
  [SK]: () => import("@formatjs/intl-datetimeformat/locale-data/sk.js"),
  [TR]: () => import("@formatjs/intl-datetimeformat/locale-data/tr.js"),
  [UK]: () => import("@formatjs/intl-datetimeformat/locale-data/uk.js"),
};

export const polyfillIntlGetCanonicalLocales = async () => {
  if (shouldPolyfillGetCanonicalLocales()) {
    await import("@formatjs/intl-getcanonicallocales/polyfill.js");
  }
};

export const polyfillIntlLocale = async () => {
  if (shouldPolyfillIntlLocale()) {
    await import("@formatjs/intl-locale/polyfill.js");
  } else if (
    !("textInfo" in Intl.Locale.prototype) &&
    !("getTextInfo" in Intl.Locale.prototype)
  ) {
    await import("@formatjs/intl-locale/polyfill-force.js");
  }
};

export const polyfillIntl = async (locale: SupportedLocale) => {
  await polyfillIntlGetCanonicalLocales();
  await polyfillIntlLocale();

  if (shouldPolyfillPluralRules(locale)) {
    await import("@formatjs/intl-pluralrules/polyfill-force.js");
    await pluralRulesLoaders[locale]();
  }

  if (shouldPolyfillNumberFormat(locale)) {
    await import("@formatjs/intl-numberformat/polyfill-force.js");
    await numberFormatLoaders[locale]();
  }

  if (shouldPolyfillDateTimeFormat(locale)) {
    await import("@formatjs/intl-datetimeformat/polyfill-force.js");
    await dateTimeFormatLoaders[locale]();
  }
};
