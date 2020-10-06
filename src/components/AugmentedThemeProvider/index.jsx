import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import deepmerge from 'deepmerge';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { getDirection } from '../../i18n';
import baseTheme from '../../styles/baseTheme';
import themes from '../../styles/themes';
import { useLocationQuery } from '../../utils/location';
import { ios } from '../../utils/platforms';
import { useSystemPaletteMode } from '../SystemPaletteModeProvider';

const displayName = 'AugmentedThemeProvider';

const AugmentedThemeProvider = ({ children }) => {
  const { locale } = useIntl();
  const direction = getDirection(locale);

  const systemPaletteMode = useSystemPaletteMode();

  const query = useLocationQuery();
  const queryTheme = useMemo(() => {
    if (!query.theme) {
      return null;
    }

    const result = { ...query.theme };

    if (query.theme) {
      if (query.theme.pureBlack === 'false') {
        result.pureBlack = false;
      }

      if (query.theme.pureBlack === 'true') {
        result.pureBlack = true;
      }
    }

    return result;
  }, [query.theme]);
  const currentTheme = useSelector((state) => state.present.theme);

  const theme = useMemo(() => {
    const previewTheme = {
      ...currentTheme,
      ...queryTheme,
    };

    let { mode, pureBlack } = previewTheme;

    if (!mode) {
      mode = systemPaletteMode;
    }

    return createMuiTheme(
      deepmerge.all([
        baseTheme({ direction, mode, pureBlack }),
        themes[previewTheme.id].theme,
        { palette: { mode } },
      ]),
    );
  }, [currentTheme, direction, queryTheme, systemPaletteMode]);

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

AugmentedThemeProvider.displayName = displayName;

export default AugmentedThemeProvider;
