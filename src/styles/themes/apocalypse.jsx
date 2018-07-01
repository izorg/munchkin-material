import React from 'react';
import { FormattedMessage } from 'react-intl';
import orange from '@material-ui/core/colors/orange';

export const key = 'apocalypse';

export const name = (
  <FormattedMessage id="theme.name.apocalypse" defaultMessage="Apocalypse" />
);

export default {
  id: key,

  overrides: {
    MuiAvatar: {
      colorDefault: {
        backgroundColor: orange[800],
      },
    },
  },

  palette: {
    primary: {
      main: orange[800],
    },
  },
};
