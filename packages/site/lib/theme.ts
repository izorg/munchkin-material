import { colors, experimental_extendTheme as extendTheme } from "@mui/material";

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: colors.brown,
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
