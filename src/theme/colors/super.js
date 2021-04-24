import yellow from "@material-ui/core/colors/yellow";
import { defineMessages } from "react-intl";

export const key = "super";

const messages = defineMessages({
  name: {
    defaultMessage: "Super",
    id: "theme.name.super",
  },
});

export const name = messages.name;

export const theme = {
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
