import orange from '@material-ui/core/colors/orange';
import { defineMessages } from 'react-intl';

export const key = 'apocalypse';

export const messages = defineMessages({
  name: {
    id: 'theme.name.apocalypse',
    defaultMessage: 'Apocalypse',
  },
});

export const theme = {
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
