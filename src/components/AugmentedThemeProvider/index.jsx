import {
  createMuiTheme,
  ThemeProvider,
  useMediaQuery,
} from '@material-ui/core';
import deepmerge from 'deepmerge';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { getDirection } from '../../i18n';
import baseTheme from '../../styles/baseTheme';
import themes from '../../styles/themes';
import { getQuery } from '../../utils/location';

import GlobalCss from './GlobalCss';

const displayName = 'AugmentedThemeProvider';

const AugmentedThemeProvider = ({ children }) => {
  const { locale } = useIntl();
  const direction = getDirection(locale);

  const queryTheme = useSelector((state) => getQuery(state).theme || null);
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

  return (
    <ThemeProvider theme={theme}>
      <GlobalCss />
      {children}
    </ThemeProvider>
  );
};

AugmentedThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

AugmentedThemeProvider.displayName = displayName;

export default AugmentedThemeProvider;
