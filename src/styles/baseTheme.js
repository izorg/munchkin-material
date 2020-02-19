import brown from '@material-ui/core/colors/brown';
import orange from '@material-ui/core/colors/orange';
import { fade } from '@material-ui/core/styles/colorManipulator';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import createPalette from '@material-ui/core/styles/createPalette';
import deepmerge from 'deepmerge';

const breakpoints = createBreakpoints({});

export default ({ direction, type }) => {
  const palette = createPalette({ type });

  let theme = {
    direction,

    mixins: {
      toolbar: {
        minHeight: 56,

        [breakpoints.up('md')]: {
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

      MuiDialog: {
        paperScrollPaper: {
          maxHeight: 'calc(100% - 32px)',
        },
      },
    },

    palette: {
      primary: {
        main: brown[500],
      },
      secondary: {
        main: orange.A400,
      },
    },

    typography: {
      fontFamily: '"Roboto", "San Francisco", "Helvetica", "Arial", sans-serif',
      useNextVariants: true,
    },
  };

  if (type === 'light') {
    theme = deepmerge(theme, {
      overrides: {
        MuiIconButton: {
          root: {
            color: palette.text.primary,
          },
        },
      },
    });
  }

  if (type === 'dark') {
    theme = deepmerge(theme, {
      overrides: {
        MuiPaper: {
          elevation1: {
            backgroundColor: fade(palette.common.white, 0.05),
            boxShadow: 'none',
          },

          elevation2: {
            backgroundColor: fade(palette.common.white, 0.07),
            boxShadow: 'none',
          },
        },
      },

      palette: {
        background: {
          default: '#121212',
        },
      },
    });
  }

  return theme;
};
