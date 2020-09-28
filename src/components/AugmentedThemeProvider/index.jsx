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
import { useSystemPaletteType } from '../SystemPaletteTypeProvider';

const displayName = 'AugmentedThemeProvider';

const AugmentedThemeProvider = ({ children }) => {
  const { locale } = useIntl();
  const direction = getDirection(locale);

  const systemType = useSystemPaletteType();

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

    let { pureBlack, type } = previewTheme;

    if (!type) {
      type = systemType;
    }

    return createMuiTheme(
      deepmerge.all([
        baseTheme({ direction, pureBlack, type }),
        themes[previewTheme.id].theme,
        { palette: { type } },
      ]),
    );
  }, [currentTheme, direction, queryTheme, systemType]);

  useEffect(() => {
    const { Keyboard } = window;

    if (Keyboard && Keyboard.setKeyboardStyle && ios) {
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
  children: PropTypes.node,
};

AugmentedThemeProvider.displayName = displayName;

export default AugmentedThemeProvider;
