import red from '@material-ui/core/colors/red';
import { defineMessages } from 'react-intl';

export const key = 'booty';

export const messages = defineMessages({
  name: {
    id: 'theme.name.booty',
    defaultMessage: 'Booty',
  },
});

export const theme = {
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
