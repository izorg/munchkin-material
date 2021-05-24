import createCache, { StylisPlugin } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import PropTypes from "prop-types";
import type { FC } from "react";
import { useIntl } from "react-intl";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

import { getDirection } from "../../i18n";

const ltrCache = createCache({
  key: "ltr",
  prepend: true,
  stylisPlugins: [prefixer as StylisPlugin],
});

const rtlCache = createCache({
  key: "rtl",
  prepend: true,
  stylisPlugins: [prefixer as StylisPlugin, rtlPlugin as StylisPlugin],
});

const AugmentedStylesProvider: FC = ({ children }) => {
  const { locale } = useIntl();
  const direction = getDirection(locale);
  const cache = direction === "rtl" ? rtlCache : ltrCache;

  return <CacheProvider value={cache}>{children}</CacheProvider>;
};

AugmentedStylesProvider.propTypes = {
  children: PropTypes.node,
};

export default AugmentedStylesProvider;
