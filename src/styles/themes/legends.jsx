import React from 'react';
import { FormattedMessage } from 'react-intl';
import common from '@material-ui/core/colors/common';
import grey from '@material-ui/core/colors/grey';

export const key = 'legends';

export const name = (
  <FormattedMessage id="theme.name.legends" defaultMessage="Legends" />
);

export default {
  id: key,

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
