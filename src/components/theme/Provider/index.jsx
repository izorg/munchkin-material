import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import { flow, get, getOr } from 'lodash/fp';
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
  getOr(null, 'theme'),
);

const getCurrentTheme = get('theme');

const ThemeProvider = ({ children }) => {
  const { locale } = useIntl();
  const direction = getDirection(locale);

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
    <MuiThemeProvider theme={theme}>
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
