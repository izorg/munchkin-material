import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { deepmerge } from "@mui/utils";
import { type FC, type PropsWithChildren, useMemo } from "react";
import { useIntl } from "react-intl";

import usePreviewTheme from "../../hooks/usePreviewTheme";
import store from "../../store";
import colorThemes from "../../theme/colors";
import getThemeOptions from "../../theme/getThemeOptions";
import { getLocaleDirection } from "../../utils/getLocaleDirection";

import { ModeSwitcher } from "./ModeSwitcher";

const { mode } = store.getState().present.theme;

if (mode) {
  document.documentElement.dataset[mode] = "";
}

const AugmentedThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const { locale } = useIntl();

  const direction = getLocaleDirection(locale);

  const previewTheme = usePreviewTheme();

  const reducedMotion = useMediaQuery("(prefers-reduced-motion)");

  const theme = useMemo(() => {
    const { id, mode, pureBlack } = previewTheme;

    return createTheme(
      deepmerge(
        getThemeOptions({
          direction,
          mode,
          pureBlack,
          reducedMotion,
        }),
        colorThemes[id].getTheme(),
      ),
    );
  }, [direction, previewTheme, reducedMotion]);

  return (
    <ThemeProvider theme={theme}>
      {previewTheme.mode && <ModeSwitcher />}
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
};

export default AugmentedThemeProvider;
