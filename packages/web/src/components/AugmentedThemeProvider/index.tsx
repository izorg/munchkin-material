import {
  CssBaseline,
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
} from "@mui/material";
import { deepmerge } from "@mui/utils";
import PropTypes from "prop-types";
import { type FC, type PropsWithChildren, useMemo } from "react";
import { useIntl } from "react-intl";

import usePreviewTheme from "../../hooks/usePreviewTheme";
import { getDirection } from "../../i18n";
import themes from "../../theme/colors";
import getThemeOptions from "../../theme/getThemeOptions";

import { ModeProvider } from "./ModeProvider";

const AugmentedThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const { locale } = useIntl();

  const direction = getDirection(locale);

  const previewTheme = usePreviewTheme();

  const theme = useMemo(() => {
    const { id, pureBlack } = previewTheme;

    return extendTheme(
      deepmerge(
        getThemeOptions({ direction, pureBlack }),
        themes[id].getTheme(),
      ),
    );
  }, [direction, previewTheme]);

  return (
    <CssVarsProvider defaultMode={previewTheme.mode ?? "system"} theme={theme}>
      <ModeProvider />
      <CssBaseline enableColorScheme />
      {children}
    </CssVarsProvider>
  );
};

AugmentedThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default AugmentedThemeProvider;
