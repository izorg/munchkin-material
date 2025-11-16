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

import {
  getBrowserLocale,
  loadMessages,
  type SupportedLocale,
} from "../../domains/i18n";
import { polyfillIntl } from "../../domains/i18n";
import usePresentSelector from "../../hooks/usePresentSelector";
import store from "../../store";
import { getLocaleDirection } from "../../utils/getLocaleDirection";

const fetchLocalisation = async (
  locale: SupportedLocale,
): Promise<{
  locale: SupportedLocale;
  messages: Awaited<ReturnType<typeof loadMessages>>;
}> => {
  const [messages] = await Promise.all([
    loadMessages(locale),
    polyfillIntl(locale),
  ]);

  return {
    locale,
    messages,
  };
};

const browserLocalePromise = getBrowserLocale();

const getInitialLocalisation = async () => {
  const browserLocale = await browserLocalePromise;

  return await fetchLocalisation(
    store.getState().present.settings.locale ?? browserLocale,
  );
};

const initialLocalisationPromise = getInitialLocalisation();

const LocaleProvider: FC<PropsWithChildren> = ({ children }) => {
  const [{ locale, messages }, setLocalisation] = useState(
    use(initialLocalisationPromise),
  );

  const selectedLocale =
    usePresentSelector((state) => state.settings.locale) ??
    use(browserLocalePromise);

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
