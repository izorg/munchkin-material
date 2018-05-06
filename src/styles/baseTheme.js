import brown from 'material-ui/colors/brown';
import createBreakpoints from 'material-ui/styles/createBreakpoints';
import createPalette from 'material-ui/styles/createPalette';
import createTypography from 'material-ui/styles/createTypography';

const breakpoints = createBreakpoints({});
const palette = createPalette({});
const typography = createTypography(palette, {});

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
      root: {
        fontSize: typography.pxToRem(24),
      },

      colorDefault: {
        backgroundColor: brown[500],
      },
    },

    MuiListItemIcon: {
      root: {
        fontSize: 24,
      },
    },

    MuiSvgIcon: {
      root: {
        fontSize: 'inherit',
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
