import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { StylesProvider } from "@material-ui/core";
import PropTypes from "prop-types";
import type { FC } from "react";
import { useIntl } from "react-intl";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

import { getDirection } from "../../i18n";

const ltrCache = createCache({
  key: "ltr",
  prepend: true,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  stylisPlugins: [prefixer],
});

const rtlCache = createCache({
  key: "rtl",
  prepend: true,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  stylisPlugins: [prefixer, rtlPlugin],
});

const AugmentedStylesProvider: FC = ({ children }) => {
  const { locale } = useIntl();
  const direction = getDirection(locale);
  const cache = direction === "rtl" ? rtlCache : ltrCache;

  return (
    <StylesProvider injectFirst>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </StylesProvider>
  );
};

AugmentedStylesProvider.propTypes = {
  children: PropTypes.node,
};

export default AugmentedStylesProvider;
