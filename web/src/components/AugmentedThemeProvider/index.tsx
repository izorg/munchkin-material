import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { deepmerge } from "@mui/utils";
import PropTypes from "prop-types";
import { type FC, type PropsWithChildren, useMemo } from "react";
import { useIntl } from "react-intl";

import usePreviewTheme from "../../hooks/usePreviewTheme";
import { getDirection } from "../../i18n";
import themes from "../../theme/colors";
import getThemeOptions from "../../theme/getThemeOptions";

const AugmentedThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const { locale } = useIntl();

  const direction = getDirection(locale);

  const systemPaletteMode = useMediaQuery("(prefers-color-scheme: dark)")
    ? "dark"
    : "light";

  const previewTheme = usePreviewTheme();

  const theme = useMemo(() => {
    const { id, mode = systemPaletteMode, pureBlack } = previewTheme;

    return createTheme(
      deepmerge(
        getThemeOptions({ direction, mode, pureBlack }),
        themes[id].getTheme(mode)
      )
    );
  }, [direction, previewTheme, systemPaletteMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
};

AugmentedThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default AugmentedThemeProvider;
