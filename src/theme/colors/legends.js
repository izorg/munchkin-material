import common from '@material-ui/core/colors/common';
import grey from '@material-ui/core/colors/grey';
import { light } from '@material-ui/core/styles/createPalette';
import { defineMessages } from 'react-intl';

export const key = 'legends';

export const messages = defineMessages({
  name: {
    id: 'theme.name.legends',
    defaultMessage: 'Legends',
  },
});

export const theme = {
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: grey[200],
          color: light.text.primary,
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        colorDefault: {
          backgroundColor: grey[500],
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: common.black,
          backgroundColor: grey[200],
          '&:hover': {
            backgroundColor: grey[400],
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
              backgroundColor: grey[200],
            },
          },
        },
      },
    },
  },

  palette: {
    primary: {
      main: grey[700],
    },
  },
};
