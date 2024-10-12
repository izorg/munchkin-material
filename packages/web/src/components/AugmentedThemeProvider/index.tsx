import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { deepmerge } from "@mui/utils";
import { type FC, type PropsWithChildren, useMemo } from "react";
import { useIntl } from "react-intl";

import usePreviewTheme from "../../hooks/usePreviewTheme";
import colorThemes from "../../theme/colors";
import getThemeOptions from "../../theme/getThemeOptions";
import { getLocaleDirection } from "../../utils/getLocaleDirection";

import { ModeSwitcher } from "./ModeSwitcher";

const AugmentedThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const { locale } = useIntl();

  const direction = getLocaleDirection(locale);

  const previewTheme = usePreviewTheme();

  const theme = useMemo(() => {
    const { id, pureBlack } = previewTheme;

    return createTheme(
      deepmerge(
        getThemeOptions({
          direction,
          pureBlack,
        }),
        colorThemes[id].getTheme(),
      ),
    );
  }, [direction, previewTheme]);

  return (
    <ThemeProvider theme={theme}>
      <ModeSwitcher />
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
};

export default AugmentedThemeProvider;
