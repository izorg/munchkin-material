import common from "@material-ui/core/colors/common";
import orange from "@material-ui/core/colors/orange";
import { alpha } from "@material-ui/core/styles/colorManipulator";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";
import deepmerge from "deepmerge";

import { ios } from "../utils/platforms";

const breakpoints = createBreakpoints({});

const getThemeOptions = ({ direction, mode = "light", pureBlack }) => {
  let theme = {
    components: {
      MuiDialog: {
        styleOverrides: {
          paperScrollPaper: {
            maxHeight: "calc(100% - 32px)",
          },
        },
      },

      MuiSnackbar: {
        styleOverrides: {
          anchorOriginBottomLeft: {
            "@supports (padding: max(0px))": {
              [breakpoints.up("sm")]: {
                left: "max(24px, env(safe-area-inset-right))",
                right: "max(24px, env(safe-area-inset-right))",
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

      MuiSpeedDialAction: {
        styleOverrides: {
          fab: {
            backgroundColor: undefined,
            color: undefined,

            // eslint-disable-next-line sort-keys
            "&:hover": {
              backgroundColor: undefined,
            },
          },
        },
      },

      MuiTooltip: {
        defaultProps: {
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

        [breakpoints.up("md")]: {
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

  if (mode === "light") {
    theme = deepmerge(theme, {
      components: {
        MuiIconButton: {
          defaultProps: {
            color: "inherit",
          },
        },
      },
    });
  }

  if (mode === "dark") {
    theme = deepmerge(theme, {
      components: {
        MuiPaper: {
          styleOverrides: {
            elevation1: {
              backgroundColor: alpha(common.white, 0.05),
              boxShadow: "none",
            },

            elevation2: {
              backgroundColor: alpha(common.white, 0.07),
              boxShadow: "none",
            },
          },
        },
      },

      palette: {
        background: {
          default: pureBlack ? "#000000" : "#121212",
        },
      },
    });
  }

  return theme;
};

export default getThemeOptions;
