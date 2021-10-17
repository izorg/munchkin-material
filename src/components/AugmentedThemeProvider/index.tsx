import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import deepmerge from "deepmerge";
import PropTypes from "prop-types";
import { FC, useEffect, useMemo } from "react";
import { useIntl } from "react-intl";

import { getDirection } from "../../i18n";
import themes from "../../theme/colors";
import getThemeOptions from "../../theme/getThemeOptions";
import { ios } from "../../utils/platforms";
import usePreviewTheme from "../theme/usePreviewTheme";

import useStatusBar from "./useStatusBar";

const AugmentedThemeProvider: FC = ({ children }) => {
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

  useStatusBar(theme);

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
