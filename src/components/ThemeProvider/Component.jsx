import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';

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

export default ThemeProvider;
