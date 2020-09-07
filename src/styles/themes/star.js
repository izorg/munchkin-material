import lightBlue from '@material-ui/core/colors/lightBlue';
import { defineMessages } from 'react-intl';

export const key = 'star';

export const messages = defineMessages({
  name: {
    id: 'theme.name.star',
    defaultMessage: 'Star',
  },
});

export const theme = {
  components: {
    MuiAvatar: {
      styleOverrides: {
        colorDefault: {
          backgroundColor: lightBlue[600],
        },
      },
    },
  },

  palette: {
    primary: {
      main: lightBlue[600],
    },
  },
};
