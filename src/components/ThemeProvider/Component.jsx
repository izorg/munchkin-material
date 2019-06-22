import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core';

import GlobalCss from './GlobalCss';

const ThemeProvider = ({ children, theme }) => (
  <MuiThemeProvider theme={theme}>
    <GlobalCss />
    {children}
  </MuiThemeProvider>
);

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

ThemeProvider.displayName = 'ThemeProvider';

export default ThemeProvider;
