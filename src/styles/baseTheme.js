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
      MuiDialog: {
        paperScrollPaper: {
          maxHeight: 'calc(100% - 32px)',
        },
      },

      MuiSnackbar: {
        root: {
          '@supports (padding: max(0px))': {
            left: 'max(8px, env(safe-area-inset-right))',
            right: 'max(8px, env(safe-area-inset-right))',
          },
        },

        anchorOriginBottomLeft: {
          '@supports (padding: max(0px))': {
            [breakpoints.up('sm')]: {
              left: 'max(24px, env(safe-area-inset-right))',
              right: 'max(24px, env(safe-area-inset-right))',
            },
          },
        },
      },

      MuiSpeedDialAction: {
        fab: {
          color: undefined,
          backgroundColor: undefined,

          '&:hover': {
            backgroundColor: undefined,
          },
        },
      },
    },

    palette: {
      secondary: {
        main: orange.A400,
      },
    },

    typography: {
      fontFamily: '"Roboto", "San Francisco", "Helvetica", "Arial", sans-serif',
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
