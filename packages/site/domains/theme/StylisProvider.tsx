"use client";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { type FC, type PropsWithChildren } from "react";
import { useIntl } from "react-intl";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

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

const StylisProvider: FC<PropsWithChildren> = ({ children }) => {
  const { locale } = useIntl();
  const direction = locale === "he" ? "rtl" : "ltr";
  const cache = direction === "rtl" ? rtlCache : ltrCache;

  return <CacheProvider value={cache}>{children}</CacheProvider>;
};

export default StylisProvider;
