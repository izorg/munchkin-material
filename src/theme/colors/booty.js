import red from '@material-ui/core/colors/red';
import { defineMessages } from 'react-intl';

export const key = 'booty';

export const messages = defineMessages({
  name: {
    defaultMessage: 'Booty',
    id: 'theme.name.booty',
  },
});

export const theme = {
  components: {
    MuiAvatar: {
      styleOverrides: {
        colorDefault: {
          backgroundColor: red[700],
        },
      },
    },
  },

  palette: {
    primary: {
      main: red[700],
    },
  },
};
