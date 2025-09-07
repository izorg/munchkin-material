import {
  type createTheme,
  type Direction,
  type PaletteMode,
} from "@mui/material";
import { common, orange } from "@mui/material/colors";
import { deepmerge } from "@mui/utils";

import { ios } from "../utils/platforms";

type AugmentedThemeOptions = Parameters<typeof createTheme>[0];

const getThemeOptions = ({
  direction,
  mode,
  pureBlack,
  reducedMotion,
}: {
  direction: Direction;
  mode?: PaletteMode;
  pureBlack: boolean;
  reducedMotion: boolean;
}): AugmentedThemeOptions => {
  let theme: AugmentedThemeOptions = {
    colorSchemes: {
      dark: {
        palette: {
          secondary: {
            main: orange.A400,
          },
        },
      },
      light: {
        palette: {
          secondary: {
            main: orange.A400,
          },
        },
      },
    },

    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: reducedMotion ? true : undefined,
        },
      },

      MuiDialog: {
        defaultProps: {
          transitionDuration: reducedMotion ? 0 : undefined,
        },
      },

      MuiIconButton: {
        defaultProps: {
          color: "inherit",
        },
      },

      MuiSnackbar: {
        styleOverrides: {
          anchorOriginBottomLeft: {
            "@media (min-width: 600px)": {
              'html[dir="ltr"] &': {
                left: "calc(24px + var(--inset-left)) /*! @noflip */",
                right: "auto /*! @noflip */",
              },
              'html[dir="rtl"] &': {
                left: "auto /*! @noflip */",
                right: "calc(24px + var(--inset-right)) /*! @noflip */",
              },
            },
          },

          root: {
            left: "calc(8px + var(--inset-left)) /*! @noflip */",
            right: "calc(8px + var(--inset-right)) /*! @noflip */",
          },
        },
      },

      MuiTooltip: {
        defaultProps: {
          disableHoverListener: ios,
          disableTouchListener: ios,
        },
      },

      MuiUseMediaQuery: {
        defaultProps: {
          noSsr: true,
        },
      },
    },

    cssVariables: {
      colorSchemeSelector: mode ? "data" : "media",
    },

    direction,

    mixins: {
      toolbar: {
        minHeight: 56,
      },
    },

    typography: {
      fontFamily:
        'system-ui, -apple-system, "Roboto", "San Francisco", "Helvetica", "Arial", sans-serif',
    },
  };

  if (pureBlack) {
    theme = deepmerge(theme, {
      colorSchemes: {
        dark: {
          palette: {
            background: {
              default: common.black,
            },
          },
        },
      },
      components: {
        MuiDialog: {
          styleOverrides: {
            paperFullScreen: ({ ownerState, theme }) => {
              if (!ownerState.fullScreen) {
                return;
              }

              return {
                backgroundColor: theme.vars.palette.background.default,
              };
            },
          },
        },
      },
    } satisfies AugmentedThemeOptions);
  }

  return theme;
};

export default getThemeOptions;
