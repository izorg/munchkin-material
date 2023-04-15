import { type ThemeOptions } from "@mui/material";
import { brown } from "@mui/material/colors";
import { defineMessage } from "react-intl";

export const key = "munchkin";

export const name = defineMessage({
  defaultMessage: "Munchkin",
  id: "theme.name.munchkin",
});

export const theme: ThemeOptions = {
  components: {
    MuiAvatar: {
      styleOverrides: {
        colorDefault: {
          backgroundColor: brown[500],
        },
      },
    },
  },

  palette: {
    primary: {
      main: brown[500],
    },
  },
};
