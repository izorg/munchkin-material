"use client";

import createCache, { type Options } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import {
  CssBaseline,
  Experimental_CssVarsProvider as CssVarsProvider,
} from "@mui/material";
import { useServerInsertedHTML } from "next/navigation";
import { type PropsWithChildren, useState } from "react";

import { theme } from "../lib/theme";

type ThemeRegistryProps = PropsWithChildren<{
  options: Options;
}>;

// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
export const ThemeRegistry = (props: ThemeRegistryProps) => {
  const { children, options } = props;

  const [{ cache, flush }] = useState(() => {
    const cache = createCache(options);

    cache.compat = true;

    // eslint-disable-next-line @typescript-eslint/unbound-method
    const prevInsert = cache.insert;

    let inserted: string[] = [];

    cache.insert = (...args) => {
      const serialized = args[1];

      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }

      return prevInsert(...args);
    };

    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };

    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();

    if (names.length === 0) {
      return null;
    }

    let styles = "";

    for (const name of names) {
      styles += cache.inserted[name];
    }

    return (
      <style
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        {children}
      </CssVarsProvider>
    </CacheProvider>
  );
};
