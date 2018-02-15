import React from 'react';
import { FormattedMessage } from 'react-intl';
import lightGreen from 'material-ui/colors/lightGreen';

export const key = 'chtulhu';

export const name = (
  <FormattedMessage id="theme.name.chtulhu" defaultMessage="Chtulhu" />
);

export default {
  overrides: {
    MuiAvatar: {
      colorDefault: {
        backgroundColor: lightGreen[700],
      },
    },
  },

  palette: {
    primary: {
      main: lightGreen[700],
    },
  },
};
