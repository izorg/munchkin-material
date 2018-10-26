import React from 'react';
import { FormattedMessage } from 'react-intl';
import yellow from '@material-ui/core/colors/yellow';

export const key = 'super';

export const name = (
  <FormattedMessage id="theme.name.super" defaultMessage="Super" />
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
