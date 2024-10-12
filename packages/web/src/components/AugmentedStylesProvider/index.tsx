import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { type FC, type PropsWithChildren } from "react";
import { useIntl } from "react-intl";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

import { getLocaleDirection } from "../../utils/getLocaleDirection";

const ltrCache = createCache({
  key: "ltr",
  prepend: true,
  stylisPlugins: [prefixer],
});

const rtlCache = createCache({
  key: "rtl",
  prepend: true,
  stylisPlugins: [prefixer, rtlPlugin],
});

const AugmentedStylesProvider: FC<PropsWithChildren> = ({ children }) => {
  const { locale } = useIntl();
  const direction = getLocaleDirection(locale);
  const cache = direction === "rtl" ? rtlCache : ltrCache;

  return <CacheProvider value={cache}>{children}</CacheProvider>;
};

export default AugmentedStylesProvider;
