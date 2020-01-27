import yellow from '@material-ui/core/colors/yellow';
import { defineMessages } from 'react-intl';

export const key = 'super';

export const messages = defineMessages({
  name: {
    id: 'theme.name.super',
    defaultMessage: 'Super',
  },
});

export const theme = {
  overrides: {
    MuiAvatar: {
      colorDefault: {
        backgroundColor: yellow[600],
      },
    },
  },

  palette: {
    primary: {
      main: yellow[600],
    },
  },
};
