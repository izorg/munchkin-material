import { ThemeOptions } from "@material-ui/core";
import brown from "@material-ui/core/colors/brown";
import { defineMessages } from "react-intl";

export const key = "munchkin";

const messages = defineMessages({
  name: {
    defaultMessage: "Default",
    id: "theme.name.munchkin",
  },
});

export const name = messages.name;

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
