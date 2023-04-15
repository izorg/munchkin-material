import { type ThemeOptions } from "@mui/material";
import { yellow } from "@mui/material/colors";
import { defineMessage } from "react-intl";

export const key = "super";

export const name = defineMessage({
  defaultMessage: "Super",
  id: "theme.name.super",
});

export const theme: ThemeOptions = {
  components: {
    MuiAvatar: {
      styleOverrides: {
        colorDefault: {
          backgroundColor: yellow[600],
        },
      },
    },
  },

  palette: {
    primary: {
      main: yellow[600],
    },
  },
};
