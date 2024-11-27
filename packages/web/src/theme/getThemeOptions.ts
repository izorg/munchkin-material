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
            "@supports (padding: max(0px))": {
              "@media (min-width:600px)": {
                'html[dir="ltr"] &': {
                  left: "max(24px, env(safe-area-inset-left))",
                  right: "auto",
                },
                'html[dir="rtl"] &': {
                  left: "auto",
                  right: "max(24px, env(safe-area-inset-right))",
                },
              },
            },
          },

          root: {
            "@supports (padding: max(0px))": {
              left: "max(8px, env(safe-area-inset-left))",
              right: "max(8px, env(safe-area-inset-right))",
            },
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

        // eslint-disable-next-line perfectionist/sort-objects
        "@media (min-width:960px)": {
          minHeight: 64,
        },
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
          components: {
            MuiDialog: {
              styleOverrides: {
                paperFullScreen: {
                  backgroundColor: common.black,
                },
              },
            },
          },
          palette: {
            background: {
              default: common.black,
            },
          },
        },
      },
    });
  }

  return theme;
};

export default getThemeOptions;
