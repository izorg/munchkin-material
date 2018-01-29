import brown from 'material-ui/colors/brown';
import { createMuiTheme } from 'material-ui/styles';

const theme = {
  palette: {
    background: {
      avatar: brown[500],
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
