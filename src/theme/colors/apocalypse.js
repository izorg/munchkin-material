import orange from '@material-ui/core/colors/orange';
import { defineMessages } from 'react-intl';

export const key = 'apocalypse';

export const messages = defineMessages({
  name: {
    defaultMessage: 'Apocalypse',
    id: 'theme.name.apocalypse',
  },
});

export const theme = {
  components: {
    MuiAvatar: {
      styleOverrides: {
        colorDefault: {
          backgroundColor: orange[800],
        },
      },
    },
  },

  palette: {
    primary: {
      main: orange[800],
    },
  },
};
