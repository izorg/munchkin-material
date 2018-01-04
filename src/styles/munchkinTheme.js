import common from 'material-ui/colors/common';
import brown from 'material-ui/colors/brown';
import { createMuiTheme } from 'material-ui/styles';

import { ios } from '../utils/platforms';

const theme = {
  overrides: {
    MuiAppBar: {
      root: {
        textAlign: ios ? 'center' : 'left',
      },
    },

    MuiButtonBase: {
      root: {
        color: 'rgba(0, 0, 0, 0.38)',
      },
    },
  },

  palette: {
    background: {
      default: common.white,
    },
    primary: brown,
  },

  typography: {
    fontFamily: '"Roboto", "San Francisco", "Helvetica", "Arial", sans-serif',
  },
};

export default createMuiTheme(theme);
