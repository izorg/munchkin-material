import { shouldPolyfill as shouldPolyfillGetCanonicalLocales } from "@formatjs/intl-getcanonicallocales/should-polyfill";
import { shouldPolyfill as shouldPolyfillLocale } from "@formatjs/intl-locale/should-polyfill";
import { shouldPolyfill as shouldPolyfillNumberFormat } from "@formatjs/intl-numberformat/should-polyfill";
import { shouldPolyfill as shouldPolyfillPluralRules } from "@formatjs/intl-pluralrules/should-polyfill";

import {
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
} from "../../i18n";

const pluralRulesLoaders = {
  [CS]: () => import("@formatjs/intl-pluralrules/locale-data/cs"),
  [DA]: () => import("@formatjs/intl-pluralrules/locale-data/da"),
  [DE]: () => import("@formatjs/intl-pluralrules/locale-data/de"),
  [EL]: () => import("@formatjs/intl-pluralrules/locale-data/el"),
  [EN]: () => import("@formatjs/intl-pluralrules/locale-data/en"),
  [ES]: () => import("@formatjs/intl-pluralrules/locale-data/es"),
  [FI]: () => import("@formatjs/intl-pluralrules/locale-data/fi"),
  [FR]: () => import("@formatjs/intl-pluralrules/locale-data/fr"),
  [HE]: () => import("@formatjs/intl-pluralrules/locale-data/he"),
  [HU]: () => import("@formatjs/intl-pluralrules/locale-data/hu"),
  [HY]: () => import("@formatjs/intl-pluralrules/locale-data/hy"),
  [IT]: () => import("@formatjs/intl-pluralrules/locale-data/it"),
  [NB]: () => import("@formatjs/intl-pluralrules/locale-data/nb"),
  [NL]: () => import("@formatjs/intl-pluralrules/locale-data/nl"),
  [PL]: () => import("@formatjs/intl-pluralrules/locale-data/pl"),
  [PT]: () => import("@formatjs/intl-pluralrules/locale-data/pt"),
  [PT_BR]: () => import("@formatjs/intl-pluralrules/locale-data/pt"),
  [RU]: () => import("@formatjs/intl-pluralrules/locale-data/ru"),
  [SK]: () => import("@formatjs/intl-pluralrules/locale-data/sk"),
  [TR]: () => import("@formatjs/intl-pluralrules/locale-data/tr"),
  [UK]: () => import("@formatjs/intl-pluralrules/locale-data/uk"),
};

const numberFormatLoaders = {
  [CS]: () => import("@formatjs/intl-numberformat/locale-data/cs"),
  [DA]: () => import("@formatjs/intl-numberformat/locale-data/da"),
  [DE]: () => import("@formatjs/intl-numberformat/locale-data/de"),
  [EL]: () => import("@formatjs/intl-numberformat/locale-data/el"),
  [EN]: () => import("@formatjs/intl-numberformat/locale-data/en"),
  [ES]: () => import("@formatjs/intl-numberformat/locale-data/es"),
  [FI]: () => import("@formatjs/intl-numberformat/locale-data/fi"),
  [FR]: () => import("@formatjs/intl-numberformat/locale-data/fr"),
  [HE]: () => import("@formatjs/intl-numberformat/locale-data/he"),
  [HU]: () => import("@formatjs/intl-numberformat/locale-data/hu"),
  [HY]: () => import("@formatjs/intl-numberformat/locale-data/hy"),
  [IT]: () => import("@formatjs/intl-numberformat/locale-data/it"),
  [NB]: () => import("@formatjs/intl-numberformat/locale-data/nb"),
  [NL]: () => import("@formatjs/intl-numberformat/locale-data/nl"),
  [PL]: () => import("@formatjs/intl-numberformat/locale-data/pl"),
  [PT]: () => import("@formatjs/intl-numberformat/locale-data/pt"),
  [PT_BR]: () => import("@formatjs/intl-numberformat/locale-data/pt"),
  [RU]: () => import("@formatjs/intl-numberformat/locale-data/ru"),
  [SK]: () => import("@formatjs/intl-numberformat/locale-data/sk"),
  [TR]: () => import("@formatjs/intl-numberformat/locale-data/tr"),
  [UK]: () => import("@formatjs/intl-numberformat/locale-data/uk"),
};

const polyfillIntl = async (locale: SupportedLocale) => {
  if (shouldPolyfillLocale()) {
    await import("@formatjs/intl-locale/polyfill");
  }

  if (shouldPolyfillGetCanonicalLocales()) {
    await import("@formatjs/intl-getcanonicallocales/polyfill");
  }

  if (shouldPolyfillPluralRules(locale)) {
    await import("@formatjs/intl-pluralrules/polyfill-force");
    await pluralRulesLoaders[locale]();
  }

  if (shouldPolyfillNumberFormat(locale)) {
    await import("@formatjs/intl-numberformat/polyfill-force");
    await numberFormatLoaders[locale]();
  }
};

export default polyfillIntl;
