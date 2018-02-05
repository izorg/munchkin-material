import brown from 'material-ui/colors/brown';
import { createMuiTheme } from 'material-ui/styles';
// import createBreakpoints from 'material-ui/styles/createBreakpoints';

// const breakpoints = createBreakpoints({});

const theme = {
  // mixins: {
  //   toolbar: {
  //     minHeight: 56,
  //
  //     [breakpoints.up('sm')]: {
  //       minHeight: 64,
  //     },
  //   },
  // },

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
