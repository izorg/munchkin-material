import React from 'react';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core';
import { flow, get } from 'lodash/fp';

import createTheme from '../../styles/createTheme';
import themes from '../../styles/themes';
import { getQuery } from '../../utils/location';

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

const mapStateToProps = createStructuredSelector({
  theme: themeSelector,
});

const mapDispatchToProps = {};

const ThemeProvider = ({ children, theme }) => (
  <MuiThemeProvider theme={theme}>
    <GlobalCss />
    {children}
  </MuiThemeProvider>
);

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ThemeProvider);
