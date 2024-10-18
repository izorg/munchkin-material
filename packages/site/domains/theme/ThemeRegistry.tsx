import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { type PropsWithChildren } from "react";

import StylisProvider from "./StylisProvider";
import { theme } from "./theme";

// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
export const ThemeRegistry = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <AppRouterCacheProvider>
      <StylisProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </StylisProvider>
    </AppRouterCacheProvider>
  );
};
