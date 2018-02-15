import React from 'react';
import { FormattedMessage } from 'react-intl';
import brown from 'material-ui/colors/brown';

export const key = 'munchkin';

export const name = (
  <FormattedMessage id="theme.name.munchkin" defaultMessage="Munchkin" />
);

export default {
  overrides: {
    MuiAvatar: {
      colorDefault: {
        backgroundColor: brown[500],
      },
    },
  },

  palette: {
    primary: {
      main: brown[500],
    },
  },
};
