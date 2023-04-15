import { type ThemeOptions } from "@mui/material";
import { orange } from "@mui/material/colors";
import { defineMessage } from "react-intl";

export const key = "apocalypse";

export const name = defineMessage({
  defaultMessage: "Apocalypse",
  id: "theme.name.apocalypse",
});

export const theme: ThemeOptions = {
  components: {
    MuiAvatar: {
      styleOverrides: {
        colorDefault: {
          backgroundColor: orange[800],
        },
      },
    },
  },

  palette: {
    primary: {
      main: orange[800],
    },
  },
};
