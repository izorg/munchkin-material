import React from 'react';
import { FormattedMessage } from 'react-intl';
import lightBlue from '@material-ui/core/colors/lightBlue';

export const key = 'star';

export const name = (
  <FormattedMessage id="theme.name.star" defaultMessage="Star" />
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
