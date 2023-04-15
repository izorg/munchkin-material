import { type ThemeOptions } from "@mui/material";
import { lightBlue } from "@mui/material/colors";
import { defineMessage } from "react-intl";

export const key = "star";

export const name = defineMessage({
  defaultMessage: "Star",
  id: "theme.name.star",
});

export const theme: ThemeOptions = {
  components: {
    MuiAvatar: {
      styleOverrides: {
        colorDefault: {
          backgroundColor: lightBlue[600],
        },
      },
    },
  },

  palette: {
    primary: {
      main: lightBlue[600],
    },
  },
};
