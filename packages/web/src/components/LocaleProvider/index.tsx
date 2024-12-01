import { captureException } from "@sentry/react";
import { type FC, type PropsWithChildren, useLayoutEffect } from "react";
import { IntlProvider } from "react-intl";
import useSWRImmutable from "swr/immutable";

import usePresentSelector from "../../hooks/usePresentSelector";
import { type AvailableLocale, getLocale, loadMessages } from "../../i18n";
import { getLocaleDirection } from "../../utils/getLocaleDirection";

import polyfillIntl, {
  polyfillIntlGetCanonicalLocales,
  polyfillIntlLocale,
} from "./polyfillIntl";

const fetchLocale = async (
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

const LocaleProvider: FC<PropsWithChildren> = ({ children }) => {
  const selectedLocale = usePresentSelector((state) => state.settings.locale);

  const { data } = useSWRImmutable(
    ["locale", selectedLocale],
    ([, locale]) => fetchLocale(locale),
    {
      keepPreviousData: true,
    },
  );

  useLayoutEffect(() => {
    if (data?.locale) {
      document.documentElement.lang = data.locale;
      document.documentElement.dir = getLocaleDirection(data.locale);
    }
  }, [data?.locale]);

  if (!data) {
    return null;
  }

  const { locale, messages } = data;

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
