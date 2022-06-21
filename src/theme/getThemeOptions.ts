import {
  type Direction,
  type PaletteMode,
  type ThemeOptions,
} from "@mui/material";
import { common, orange } from "@mui/material/colors";
import { deepmerge } from "@mui/utils";

import { ios } from "../utils/platforms";

const getThemeOptions = ({
  direction,
  mode = "light",
  pureBlack,
}: {
  direction: Direction;
  mode: PaletteMode;
  pureBlack: boolean;
}): ThemeOptions => {
  let theme: ThemeOptions = {
    components: {
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
                [direction === "rtl" ? "right" : "left"]:
                  "max(24px, env(safe-area-inset-right))",
                [direction === "rtl" ? "left" : "right"]: "auto",
              },
            },
          },

          root: {
            "@supports (padding: max(0px))": {
              left: "max(8px, env(safe-area-inset-right))",
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

    direction,

    mixins: {
      toolbar: {
        minHeight: 56,

        // eslint-disable-next-line sort-keys
        "@media (min-width:960px)": {
          minHeight: 64,
        },
      },
    },

    palette: {
      mode,
      secondary: {
        main: orange.A400,
      },
    },

    typography: {
      fontFamily:
        'system-ui, -apple-system, "Roboto", "San Francisco", "Helvetica", "Arial", sans-serif',
    },
  };

  if (mode === "dark" && pureBlack) {
    theme = deepmerge(theme, {
      palette: {
        background: {
          default: common.black,
          paper: common.black,
        },
      },
    });
  }

  return theme;
};

export default getThemeOptions;
