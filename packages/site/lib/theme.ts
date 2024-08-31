"use client";

import { createTheme } from "@mui/material";
import brown from "@mui/material/colors/brown";

export const theme = createTheme({
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
  },

  cssVariables: true,

  typography: {
    fontFamily: '"Roboto", "San Francisco", "Helvetica", "Arial", sans-serif',
  },
});
