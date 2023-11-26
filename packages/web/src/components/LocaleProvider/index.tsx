import { captureException } from "@sentry/react";
import PropTypes from "prop-types";
import { type FC, type PropsWithChildren, useLayoutEffect } from "react";
import { IntlProvider } from "react-intl";
import useSWRImmutable from "swr/immutable";

import usePresentSelector from "../../hooks/usePresentSelector";
import {
  getDirection,
  getLocale,
  loadMessages,
  type SupportedLocale,
} from "../../i18n";

import polyfillIntl from "./polyfillIntl";

const defaultLocale = getLocale();

const fetchLocale = async (
  locale: SupportedLocale,
): Promise<{
  locale: SupportedLocale;
  messages: Awaited<ReturnType<typeof loadMessages>>;
}> => {
  const [messages] = await Promise.all([
    loadMessages(locale),
    polyfillIntl(locale),
  ]);

  return { locale, messages };
};

const LocaleProvider: FC<PropsWithChildren> = ({ children }) => {
  const selectedLocale =
    usePresentSelector((state) => state.settings.locale) ?? defaultLocale;

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
      document.documentElement.dir = getDirection(data.locale);
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

LocaleProvider.propTypes = {
  children: PropTypes.node,
};

export default LocaleProvider;
