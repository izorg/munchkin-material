import React from 'react';
import { FormattedMessage } from 'react-intl';
import yellow from '@material-ui/core/colors/yellow';

export const key = 'super';

export const name = (
  <FormattedMessage defaultMessage="Super" id="theme.name.super" />
);

export default {
  id: key,

  overrides: {
    MuiAvatar: {
      colorDefault: {
        backgroundColor: yellow[600],
      },
    },
  },

  palette: {
    primary: {
      main: yellow[600],
    },
  },
};
