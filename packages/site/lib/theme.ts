"use client";

import brown from "@mui/material/colors/brown";
import extendTheme from "@mui/material/styles/experimental_extendTheme";

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: brown,
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

  typography: {
    fontFamily: '"Roboto", "San Francisco", "Helvetica", "Arial", sans-serif',
  },
});
