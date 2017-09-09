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

  typography: {
    fontFamily: '"Roboto", "San Francisco", "Helvetica", "Arial", sans-serif',
  },
};

export default createMuiTheme(theme);
