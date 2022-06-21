import { type ThemeOptions } from "@mui/material";
import { grey } from "@mui/material/colors";
import { defineMessages } from "react-intl";

export const key = "legends";

const messages = defineMessages({
  name: {
    defaultMessage: "Legends",
    id: "theme.name.legends",
  },
});

export const name = messages.name;

export const theme: ThemeOptions = {
  components: {
    MuiAvatar: {
      styleOverrides: {
        colorDefault: {
          backgroundColor: grey[500],
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
