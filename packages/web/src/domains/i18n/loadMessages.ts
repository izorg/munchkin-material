import { type MessageFormatElement } from "react-intl";

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

/* istanbul ignore next */
const loaders = {
  [BE]: () => import("../../../l10n/generated/be.json"),
  [CS]: () => import("../../../l10n/generated/cs.json"),
  [DA]: () => import("../../../l10n/generated/da.json"),
  [DE]: () => import("../../../l10n/generated/de.json"),
  [EL]: () => import("../../../l10n/generated/el.json"),
  [EN]: () => import("../../../l10n/generated/en.json"),
  [ES]: () => import("../../../l10n/generated/es.json"),
  [FI]: () => import("../../../l10n/generated/fi.json"),
  [FR]: () => import("../../../l10n/generated/fr.json"),
  [HE]: () => import("../../../l10n/generated/he.json"),
  [HU]: () => import("../../../l10n/generated/hu.json"),
  [HY]: () => import("../../../l10n/generated/hy.json"),
  [IT]: () => import("../../../l10n/generated/it.json"),
  [NB]: () => import("../../../l10n/generated/nb.json"),
  [NL]: () => import("../../../l10n/generated/nl.json"),
  [PL]: () => import("../../../l10n/generated/pl.json"),
  [PT]: () => import("../../../l10n/generated/pt.json"),
  [PT_BR]: () => import("../../../l10n/generated/pt-BR.json"),
  [RU]: () => import("../../../l10n/generated/ru.json"),
  [SK]: () => import("../../../l10n/generated/sk.json"),
  [TR]: () => import("../../../l10n/generated/tr.json"),
  [UK]: () => import("../../../l10n/generated/uk.json"),
};

export const loadMessages = async (
  locale: SupportedLocale,
): Promise<Record<string, MessageFormatElement[]> | Record<string, string>> => {
  /* istanbul ignore next */
  const messages = await loaders[locale]();

  /* istanbul ignore next */
  return messages.default ?? messages;
};
