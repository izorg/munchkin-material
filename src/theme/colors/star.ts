import { ThemeOptions } from "@material-ui/core";
import lightBlue from "@material-ui/core/colors/lightBlue";
import { defineMessages } from "react-intl";

export const key = "star";

const messages = defineMessages({
  name: {
    defaultMessage: "Star",
    id: "theme.name.star",
  },
});

export const name = messages.name;

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
