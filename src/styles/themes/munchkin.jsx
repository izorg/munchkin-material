import brown from '@material-ui/core/colors/brown';
import { defineMessages } from 'react-intl';

export const key = 'munchkin';

export const messages = defineMessages({
  name: {
    id: 'theme.name.munchkin',
    defaultMessage: 'Munchkin',
  },
});

export const theme = {
  overrides: {
    MuiAvatar: {
      colorDefault: {
        backgroundColor: brown[500],
      },
    },
  },

  palette: {
    primary: {
      main: brown[500],
    },
  },
};
