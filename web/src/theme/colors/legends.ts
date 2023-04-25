import { type ThemeOptions } from "@mui/material";
import { grey } from "@mui/material/colors";
import { defineMessage } from "react-intl";

export const key = "legends";

export const name = defineMessage({
  defaultMessage: "Legends",
  id: "theme.name.legends",
});

export const theme: ThemeOptions = {
  components: {
    MuiAvatar: {
      styleOverrides: {
        colorDefault: {
          backgroundColor: grey[700],
        },
      },
    },
  },

  palette: {
    primary: {
      main: grey[700],
    },
  },
};
