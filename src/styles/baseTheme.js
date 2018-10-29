import deepmerge from 'deepmerge';

import brown from '@material-ui/core/colors/brown';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import createPalette from '@material-ui/core/styles/createPalette';

const breakpoints = createBreakpoints({});

export default (type) => {
  let theme = {
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

  if (type === 'light') {
    const palette = createPalette({ type });

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

  return theme;
};
