import { type ThemeOptions } from "@mui/material";
import { lightGreen } from "@mui/material/colors";
import { defineMessage } from "react-intl";

export const key = "cthulhu";

export const name = defineMessage({
  defaultMessage: "Cthulhu",
  id: "theme.name.cthulhu",
});

export const theme: ThemeOptions = {
  components: {
    MuiAvatar: {
      styleOverrides: {
        colorDefault: {
          backgroundColor: lightGreen[700],
        },
      },
    },
  },

  palette: {
    primary: {
      main: lightGreen[700],
    },
  },
};
