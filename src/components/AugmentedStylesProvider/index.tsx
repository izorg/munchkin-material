import createCache, { type StylisPlugin } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import PropTypes from "prop-types";
import { type FC, type ReactNode } from "react";
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

type AugmentedStylesProviderProps = {
  children?: ReactNode;
};

const AugmentedStylesProvider: FC<AugmentedStylesProviderProps> = ({
  children,
}) => {
  const { locale } = useIntl();
  const direction = getDirection(locale);
  const cache = direction === "rtl" ? rtlCache : ltrCache;

  return <CacheProvider value={cache}>{children}</CacheProvider>;
};

AugmentedStylesProvider.propTypes = {
  children: PropTypes.node,
};

export default AugmentedStylesProvider;
