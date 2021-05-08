import {
  createMuiTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  useMediaQuery,
} from "@material-ui/core";
import deepmerge from "deepmerge";
import PropTypes from "prop-types";
import { FC, useEffect, useMemo } from "react";
import { useIntl } from "react-intl";

import { ThemeState } from "../../ducks/theme";
import { getDirection } from "../../i18n";
import themes from "../../theme/colors";
import getThemeOptions from "../../theme/getThemeOptions";
import { useLocationQuery } from "../../utils/location";
import { ios } from "../../utils/platforms";
import usePresentSelector from "../../utils/usePresentSelector";

import useStatusBar from "./useStatusBar";

const displayName = "AugmentedThemeProvider";

type ParsedQsTheme = {
  id?: string;
  mode?: PaletteMode;
  pureBlack?: "false" | "true";
};

const AugmentedThemeProvider: FC = ({ children }) => {
  const { locale } = useIntl();

  const direction = getDirection(locale);

  const systemPaletteMode = useMediaQuery("(prefers-color-scheme: dark)")
    ? "dark"
    : "light";

  const query = useLocationQuery();

  const parsedQsTheme = query.theme as ParsedQsTheme | undefined;

  const queryTheme = useMemo(() => {
    if (!parsedQsTheme) {
      return null;
    }

    const result: Partial<ThemeState> = {
      id: parsedQsTheme.id,
      mode: parsedQsTheme.mode,
    };

    if (parsedQsTheme.pureBlack) {
      if (parsedQsTheme.pureBlack === "false") {
        result.pureBlack = false;
      }

      if (parsedQsTheme.pureBlack === "true") {
        result.pureBlack = true;
      }
    }

    return result;
  }, [parsedQsTheme]);

  const currentTheme = usePresentSelector((state) => state.theme);

  const theme = useMemo(() => {
    const previewTheme = {
      ...currentTheme,
      ...queryTheme,
    };

    const { mode = systemPaletteMode, pureBlack } = previewTheme;

    return createMuiTheme(
      deepmerge(
        getThemeOptions({ direction, mode, pureBlack }),
        themes[previewTheme.id].theme
      )
    );
  }, [currentTheme, direction, queryTheme, systemPaletteMode]);

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

AugmentedThemeProvider.displayName = displayName;

export default AugmentedThemeProvider;
