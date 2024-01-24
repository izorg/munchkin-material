import CssBaseline from "@mui/material/CssBaseline";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles/CssVarsProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { type PropsWithChildren } from "react";

import { theme } from "../lib/theme";

// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
export const ThemeRegistry = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <AppRouterCacheProvider>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        {children}
      </CssVarsProvider>
    </AppRouterCacheProvider>
  );
};
