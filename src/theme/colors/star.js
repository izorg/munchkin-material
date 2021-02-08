import lightBlue from "@material-ui/core/colors/lightBlue";
import { defineMessages } from "react-intl";

export const key = "star";

export const messages = defineMessages({
  name: {
    defaultMessage: "Star",
    id: "theme.name.star",
  },
});

export const theme = {
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
