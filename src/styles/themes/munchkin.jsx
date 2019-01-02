import React from 'react';
import { FormattedMessage } from 'react-intl';
import brown from '@material-ui/core/colors/brown';

export const key = 'munchkin';

export const name = (
  <FormattedMessage defaultMessage="Munchkin" id="theme.name.munchkin" />
);

export default {
  id: key,

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
