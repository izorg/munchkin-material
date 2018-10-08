import brown from '@material-ui/core/colors/brown';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';

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

    MuiModal: {
      root: {
        height: '100vh',
        width: '100vw',
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
    useNextVariants: true,
  },
};
