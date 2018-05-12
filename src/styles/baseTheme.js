import brown from 'material-ui/colors/brown';
import createBreakpoints from 'material-ui/styles/createBreakpoints';

const breakpoints = createBreakpoints({});

export default {
  mixins: {
    toolbar: {
      minHeight: 56,

      [breakpoints.up('sm')]: {
        minHeight: 64,
      },
    },
  },

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

  props: {
    MuiTooltip: {
      disableFocusListener: true,
    },
  },

  typography: {
    fontFamily: '"Roboto", "San Francisco", "Helvetica", "Arial", sans-serif',
  },
};
