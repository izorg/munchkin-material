import common from 'material-ui/colors/common';
import brown from 'material-ui/colors/brown';
import { createMuiTheme } from 'material-ui/styles';

const theme = {
  overrides: {
    MuiButtonBase: {
      root: {
        color: 'rgba(0, 0, 0, 0.38)',
      },
    },
  },

  palette: {
    background: {
      avatar: brown[500],
      default: common.white,
    },
    primary: {
      main: brown[500],
    },
  },

  typography: {
    fontFamily: '"Roboto", "San Francisco", "Helvetica", "Arial", sans-serif',
  },
};

export default createMuiTheme(theme);
