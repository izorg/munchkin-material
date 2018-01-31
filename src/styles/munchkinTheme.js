import brown from 'material-ui/colors/brown';
import { createMuiTheme } from 'material-ui/styles';

const theme = {
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

  typography: {
    fontFamily: '"Roboto", "San Francisco", "Helvetica", "Arial", sans-serif',
  },
};

export default createMuiTheme(theme);
