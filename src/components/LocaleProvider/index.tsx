import { captureException } from "@sentry/react";
import PropTypes from "prop-types";
import {
  type FC,
  type PropsWithChildren,
  useEffect,
  useLayoutEffect,
  useState,
  useTransition,
} from "react";
import { IntlProvider } from "react-intl";

import { getDirection, getLocale } from "../../i18n";
import usePresentSelector from "../../utils/usePresentSelector";

import readMessages from "./readMessages";

const defaultLocale = getLocale();

const LocaleProvider: FC<PropsWithChildren> = ({ children }) => {
  const selectedLocale =
    usePresentSelector((state) => state.settings.locale) || defaultLocale;

  const [locale, setLocale] = useState(selectedLocale);

  const messages = readMessages(locale);

  const [, startTransition] = useTransition();

  useEffect(() => {
    if (selectedLocale !== locale) {
      startTransition(() => {
        setLocale(selectedLocale);
      });
    }
  }, [locale, selectedLocale]);

  useLayoutEffect(() => {
    document.documentElement.lang = locale;
    document.body.dir = getDirection(locale);
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

LocaleProvider.propTypes = {
  children: PropTypes.node,
};

export default LocaleProvider;
