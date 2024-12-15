import { captureException } from "@sentry/react";
import {
  type FC,
  type PropsWithChildren,
  startTransition,
  use,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { IntlProvider } from "react-intl";

import usePresentSelector from "../../hooks/usePresentSelector";
import { type AvailableLocale, getLocale, loadMessages } from "../../i18n";
import store from "../../store";
import { getLocaleDirection } from "../../utils/getLocaleDirection";

import polyfillIntl, {
  polyfillIntlGetCanonicalLocales,
  polyfillIntlLocale,
} from "./polyfillIntl";

const fetchLocalisation = async (
  locale?: AvailableLocale,
): Promise<{
  locale: AvailableLocale;
  messages: Awaited<ReturnType<typeof loadMessages>>;
}> => {
  let availableLocale = locale;

  if (!availableLocale) {
    await polyfillIntlGetCanonicalLocales();
    await polyfillIntlLocale();

    availableLocale = getLocale();
  }

  const [messages] = await Promise.all([
    loadMessages(availableLocale),
    polyfillIntl(availableLocale),
  ]);

  return {
    locale: availableLocale,
    messages,
  };
};

const initialLocalisationPromise = fetchLocalisation(
  store.getState().present.settings.locale,
);

const LocaleProvider: FC<PropsWithChildren> = ({ children }) => {
  const [{ locale, messages }, setLocalisation] = useState(
    use(initialLocalisationPromise),
  );

  const selectedLocale = usePresentSelector((state) => state.settings.locale);

  useEffect(() => {
    if (selectedLocale === locale) {
      return;
    }

    startTransition(async () => {
      const localisation = await fetchLocalisation(selectedLocale);

      startTransition(() => {
        setLocalisation(localisation);
      });
    });
  }, [locale, selectedLocale]);

  useLayoutEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getLocaleDirection(locale);
  }, [locale]);

  return (
    <IntlProvider
      locale={locale}
      messages={messages}
      onError={
        process.env.NODE_ENV === "production" ? captureException : undefined
      }
    >
      {children}
    </IntlProvider>
  );
};

export default LocaleProvider;
