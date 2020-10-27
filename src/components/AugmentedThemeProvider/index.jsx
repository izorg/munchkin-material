import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import deepmerge from 'deepmerge';
import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { getDirection } from '../../i18n';
import themes from '../../theme/colors';
import getThemeOptions from '../../theme/getThemeOptions';
import { useLocationQuery } from '../../utils/location';
import { ios } from '../../utils/platforms';
import { useSystemPaletteMode } from '../SystemPaletteModeProvider';

import useStatusBar from './useStatusBar';

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
      deepmerge(
        getThemeOptions({ direction, mode, pureBlack }),
        themes[previewTheme.id].theme,
      ),
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
