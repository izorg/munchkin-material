import React from 'react';
import { FormattedMessage } from 'react-intl';
import lightBlue from '@material-ui/core/colors/lightBlue';

export const key = 'star';

export const name = (
  <FormattedMessage defaultMessage="Star" id="theme.name.star" />
);

export default {
  id: key,

  overrides: {
    MuiAvatar: {
      colorDefault: {
        backgroundColor: lightBlue[600],
      },
    },
  },

  palette: {
    primary: {
      main: lightBlue[600],
    },
  },
};
