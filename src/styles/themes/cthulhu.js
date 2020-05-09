import lightGreen from '@material-ui/core/colors/lightGreen';
import { defineMessages } from 'react-intl';

export const key = 'cthulhu';

export const messages = defineMessages({
  name: {
    id: 'theme.name.cthulhu',
    defaultMessage: 'Cthulhu',
  },
});

export const theme = {
  overrides: {
    MuiAvatar: {
      colorDefault: {
        backgroundColor: lightGreen[700],
      },
    },
  },

  palette: {
    primary: {
      main: lightGreen[700],
    },
  },
};
