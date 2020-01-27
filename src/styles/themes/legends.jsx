import common from '@material-ui/core/colors/common';
import grey from '@material-ui/core/colors/grey';
import { defineMessages } from 'react-intl';

export const key = 'legends';

export const messages = defineMessages({
  name: {
    id: 'theme.name.legends',
    defaultMessage: 'Legends',
  },
});

export const theme = {
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: grey[200],
        color: common.black,
      },
    },

    MuiAvatar: {
      colorDefault: {
        backgroundColor: grey[500],
      },
    },

    MuiButton: {
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

  palette: {
    primary: {
      main: grey[700],
    },
  },
};
