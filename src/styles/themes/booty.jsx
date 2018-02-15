import React from 'react';
import { FormattedMessage } from 'react-intl';
import red from 'material-ui/colors/red';

export const key = 'booty';

export const name = (
  <FormattedMessage id="theme.name.booty" defaultMessage="Booty" />
);

export default {
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
