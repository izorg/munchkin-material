import createMuiTheme from 'material-ui/styles/createMuiTheme';
import brown from 'material-ui/colors/brown';

import { ios } from '../helpers/platforms';

const theme = {
  overrides: {
    MuiAppBar: {
      root: {
        textAlign: ios ? 'center' : 'left',
      },
    },

    MuiAvatar: {
      colorDefault: {
        backgroundColor: brown[500],
      },
    },
  },

  palette: {
    primary: brown,
  },
};

if (ios) {
  Object.assign(theme, {
    typography: {
      fontFamily: '"San Francisco", sans-serif',
    },
  });
}

export default createMuiTheme(theme);
