import { MuiThemeProvider } from '@material-ui/core';
import { flow, get } from 'lodash/fp';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import createTheme from '../../../styles/createTheme';
import themes from '../../../styles/themes';
import { getQuery } from '../../../utils/location';

import GlobalCss from './GlobalCss';

const themeSelector = createSelector(
  flow(
    getQuery,
    get('theme'),
  ),
  get('theme'),
  (previewTheme, currentTheme) => {
    const theme = {
      ...currentTheme,
      ...previewTheme,
    };

    return createTheme(themes[theme.id], theme.type);
  },
);

const ThemeProvider = ({ children }) => {
  const { locale } = useIntl();
  const theme = useSelector(themeSelector);

  return (
    <MuiThemeProvider theme={{ ...theme, locale }}>
      <GlobalCss />
      {children}
    </MuiThemeProvider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

ThemeProvider.displayName = 'ThemeProvider';

export default ThemeProvider;
