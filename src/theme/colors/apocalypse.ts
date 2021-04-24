import { ThemeOptions } from "@material-ui/core";
import orange from "@material-ui/core/colors/orange";
import { defineMessages } from "react-intl";

export const key = "apocalypse";

const messages = defineMessages({
  name: {
    defaultMessage: "Apocalypse",
    id: "theme.name.apocalypse",
  },
});

export const name = messages.name;

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
