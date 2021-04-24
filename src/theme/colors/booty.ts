import { ThemeOptions } from "@material-ui/core";
import red from "@material-ui/core/colors/red";
import { defineMessages } from "react-intl";

export const key = "booty";

const messages = defineMessages({
  name: {
    defaultMessage: "Booty",
    id: "theme.name.booty",
  },
});

export const name = messages.name;

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
