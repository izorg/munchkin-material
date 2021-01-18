import lightGreen from '@material-ui/core/colors/lightGreen';
import { defineMessages } from 'react-intl';

export const key = 'cthulhu';

export const messages = defineMessages({
  name: {
    defaultMessage: 'Cthulhu',
    id: 'theme.name.cthulhu',
  },
});

export const theme = {
  components: {
    MuiAvatar: {
      styleOverrides: {
        colorDefault: {
          backgroundColor: lightGreen[700],
        },
      },
    },
  },

  palette: {
    primary: {
      main: lightGreen[700],
    },
  },
};
