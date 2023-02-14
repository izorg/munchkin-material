import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { deepmerge } from "@mui/utils";
import PropTypes from "prop-types";
import { type FC, type PropsWithChildren, useEffect, useMemo } from "react";
import { useIntl } from "react-intl";

import usePreviewTheme from "../../hooks/usePreviewTheme";
import { getDirection } from "../../i18n";
import themes from "../../theme/colors";
import getThemeOptions from "../../theme/getThemeOptions";
import { ios } from "../../utils/platforms";

const AugmentedThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const { locale } = useIntl();

  const direction = getDirection(locale);

  const systemPaletteMode = useMediaQuery("(prefers-color-scheme: dark)")
    ? "dark"
    : "light";

  const previewTheme = usePreviewTheme();

  const theme = useMemo(() => {
    const { mode = systemPaletteMode, pureBlack } = previewTheme;

    return createTheme(
      deepmerge(
        getThemeOptions({ direction, mode, pureBlack }),
        themes[previewTheme.id].theme
      )
    );
  }, [direction, previewTheme, systemPaletteMode]);

  useEffect(() => {
    const { Keyboard } = window;

    if (Keyboard && Keyboard.setKeyboardStyle && ios) {
      Keyboard.setKeyboardStyle(theme.palette.mode); // cordova ios
    }
  }, [theme.palette.mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

AugmentedThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default AugmentedThemeProvider;
