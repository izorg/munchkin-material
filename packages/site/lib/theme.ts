import { colors, createTheme, responsiveFontSizes } from "@mui/material";

export const theme = responsiveFontSizes(
  createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
    },

    palette: {
      background: {
        default: colors.common.white,
      },
      primary: colors.brown,
    },

    typography: {
      fontFamily: '"Roboto", "San Francisco", "Helvetica", "Arial", sans-serif',
    },
  }),
);
