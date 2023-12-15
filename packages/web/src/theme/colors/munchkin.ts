import { type CssVarsThemeOptions } from "@mui/material";
import { brown } from "@mui/material/colors";
import { defineMessage } from "react-intl";

export const key = "munchkin";

export const name = defineMessage({
  defaultMessage: "Munchkin",
  id: "theme.name.munchkin",
});

export const getTheme = (): CssVarsThemeOptions => {
  return {
    colorSchemes: {
      dark: {
        palette: {
          primary: {
            main: brown[200],
          },
        },
      },
      light: {
        palette: {
          primary: {
            main: brown[500],
          },
        },
      },
    },
  };
};
