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

    return extendTheme(
      deepmerge(
        getThemeOptions({ direction, pureBlack }),
        colorThemes[id].getTheme(),
      ),
    );
  }, [direction, previewTheme]);

  return (
    <CssVarsProvider defaultMode={previewTheme.mode ?? "system"} theme={theme}>
      <ModeSwitcher />
      <CssBaseline enableColorScheme />
      {children}
    </CssVarsProvider>
  );
};

AugmentedThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default AugmentedThemeProvider;
