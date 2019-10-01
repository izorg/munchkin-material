import { MuiThemeProvider } from '@material-ui/core';
import { jssPreset, StylesProvider } from '@material-ui/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { flow, get } from 'lodash/fp';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { getDirection } from '../../../i18n';
import createTheme from '../../../styles/createTheme';
import themes from '../../../styles/themes';
import { getQuery } from '../../../utils/location';

import GlobalCss from './GlobalCss';

const getPreviewTheme = flow(
  getQuery,
  get('theme'),
);

const getCurrentTheme = get('theme');

const ThemeProvider = ({ children }) => {
  const { locale } = useIntl();
  const direction = getDirection(locale);

  const jss = useMemo(
    () =>
      direction === 'rtl'
        ? create({ plugins: [...jssPreset().plugins, rtl()] })
        : create({ plugins: jssPreset().plugins }),
    [direction],
  );

  const previewTheme = useSelector(getPreviewTheme);
  const currentTheme = useSelector(getCurrentTheme);

  const theme = useMemo(() => {
    const { id, type } = {
      ...currentTheme,
      ...previewTheme,
    };

    return createTheme(themes[id], type, direction);
  }, [currentTheme, direction, previewTheme]);

  return (
    <StylesProvider jss={jss}>
      <MuiThemeProvider theme={theme}>
        <GlobalCss />
        {children}
      </MuiThemeProvider>
    </StylesProvider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

ThemeProvider.displayName = 'ThemeProvider';

export default ThemeProvider;
