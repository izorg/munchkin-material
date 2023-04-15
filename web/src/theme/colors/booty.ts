import { type ThemeOptions } from "@mui/material";
import { red } from "@mui/material/colors";
import { defineMessage } from "react-intl";

export const key = "booty";

export const name = defineMessage({
  defaultMessage: "Booty",
  id: "theme.name.booty",
});

export const theme: ThemeOptions = {
  components: {
    MuiAvatar: {
      styleOverrides: {
        colorDefault: {
          backgroundColor: red[700],
        },
      },
    },
  },

  palette: {
    primary: {
      main: red[700],
    },
  },
};
