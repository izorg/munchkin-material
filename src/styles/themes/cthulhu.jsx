import React from 'react';
import { FormattedMessage } from 'react-intl';
import lightGreen from '@material-ui/core/colors/lightGreen';

export const key = 'cthulhu';

export const name = (
  <FormattedMessage defaultMessage="Cthulhu" id="theme.name.cthulhu" />
);

export default {
  id: key,

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
