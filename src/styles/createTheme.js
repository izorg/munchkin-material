import { createMuiTheme } from '@material-ui/core/styles';
import deepmerge from 'deepmerge';

import baseTheme from './baseTheme';

export default (selectedTheme, disableHover) => {
  let theme = createMuiTheme(deepmerge(baseTheme, selectedTheme));

  if (disableHover) {
    theme = deepmerge(theme, {
      overrides: {
        MuiIconButton: {
          root: {
            '&:hover': {
              backgroundColor: 'transparent',
            },
          },
          colorPrimary: {
            '&:hover': {
              backgroundColor: 'transparent',
            },
          },
        },
        MuiButton: {
          root: {
            '&:hover': {
              backgroundColor: 'transparent',
            },
          },
          flatPrimary: {
            '&:hover': {
              backgroundColor: 'transparent',
            },
          },
          flatSecondary: {
            '&:hover': {
              backgroundColor: 'transparent',
            },
          },
          raised: {
            '&:hover': {
              backgroundColor: theme.palette.grey[300],
            },
          },
          raisedPrimary: {
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
            },
          },
          raisedSecondary: {
            '&:hover': {
              backgroundColor: theme.palette.secondary.main,
            },
          },
        },
        MuiListItem: {
          button: {
            '&:hover': {
              backgroundColor: 'transparent',
            },
          },
        },
      },
    });
  }

  return theme;
};
