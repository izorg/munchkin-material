"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { type PropsWithChildren, useMemo } from "react";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

import { theme } from "./theme";

type ThemeRegistryProps = PropsWithChildren<{
  direction: string;
}>;

export const ThemeRegistry = (props: ThemeRegistryProps) => {
  const { children, direction } = props;

  const options = useMemo(
    () =>
      direction === "rtl"
        ? {
            key: "rtl",
            prepend: true,
            stylisPlugins: [prefixer, rtlPlugin],
          }
        : {
            key: "ltr",
            prepend: true,
            stylisPlugins: [prefixer],
          },
    [direction],
  );

  return (
    <AppRouterCacheProvider options={options}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};
