"use client";

import { createTheme, responsiveFontSizes } from "@mui/material";
import { brown } from "@mui/material/colors";

export const theme = responsiveFontSizes(
  createTheme({
    colorSchemes: {
      dark: {
        palette: {
          primary: {
            main: brown[200],
          },
        },
      },
      light: {
        palette: {
          primary: {
            main: brown[500],
          },
        },
      },
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },

      MuiStack: {
        defaultProps: {
          useFlexGap: true,
        },
      },
    },

    cssVariables: true,

    typography: {
      fontFamily: '"Roboto", "San Francisco", "Helvetica", "Arial", sans-serif',
    },
  }),
);
