import {
  createMuiTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from '@material-ui/core';
import deepmerge from 'deepmerge';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { getDirection } from '../../i18n';
import baseTheme from '../../styles/baseTheme';
import themes from '../../styles/themes';
import { useLocationQuery } from '../../utils/location';

const displayName = 'AugmentedThemeProvider';

const AugmentedThemeProvider = ({ children }) => {
  const { locale } = useIntl();
  const direction = getDirection(locale);

  const query = useLocationQuery();
  const queryTheme = query.theme || null;
  const currentTheme = useSelector((state) => state.theme);

  const dark = useMediaQuery('(prefers-color-scheme: dark)', {
    noSsr: true,
  });

  const theme = useMemo(() => {
    const previewTheme = {
      ...currentTheme,
      ...queryTheme,
    };

    let { type } = previewTheme;

    if (!type && window.matchMedia('(prefers-color-scheme)').matches) {
      type = dark ? 'dark' : 'light';
    }

    return createMuiTheme(
      deepmerge.all([
        baseTheme({ direction, type }),
        themes[previewTheme.id].theme,
        { palette: { type } },
      ]),
    );
  }, [currentTheme, dark, direction, queryTheme]);

  useEffect(() => {
    const { Keyboard } = window;

    if (Keyboard && Keyboard.setKeyboardStyle) {
      Keyboard.setKeyboardStyle(theme.palette.type); // cordova ios
    }
  }, [theme.palette.type]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

AugmentedThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

AugmentedThemeProvider.displayName = displayName;

export default AugmentedThemeProvider;
