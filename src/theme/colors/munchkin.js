import brown from '@material-ui/core/colors/brown';
import { defineMessages } from 'react-intl';

export const key = 'munchkin';

export const messages = defineMessages({
  name: {
    defaultMessage: 'Munchkin',
    id: 'theme.name.munchkin',
  },
});

export const theme = {
  components: {
    MuiAvatar: {
      styleOverrides: {
        colorDefault: {
          backgroundColor: brown[500],
        },
      },
    },
  },

  palette: {
    primary: {
      main: brown[500],
    },
  },
};
