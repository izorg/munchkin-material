import React from 'react';
import { FormattedMessage } from 'react-intl';
import red from '@material-ui/core/colors/red';

export const key = 'booty';

export const name = (
  <FormattedMessage defaultMessage="Booty" id="theme.name.booty" />
);

export default {
  id: key,

  overrides: {
    MuiAvatar: {
      colorDefault: {
        backgroundColor: red[700],
      },
    },
  },

  palette: {
    primary: {
      main: red[700],
    },
  },
};
