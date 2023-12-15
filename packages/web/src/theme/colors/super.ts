import { type CssVarsThemeOptions } from "@mui/material";
import { yellow } from "@mui/material/colors";
import { defineMessage } from "react-intl";

export const key = "super";

export const name = defineMessage({
  defaultMessage: "Super",
  id: "theme.name.super",
});

export const getTheme = (): CssVarsThemeOptions => {
  return {
    colorSchemes: {
      dark: {
        palette: {
          primary: {
            main: yellow[200],
          },
        },
      },
      light: {
        palette: {
          primary: {
            main: yellow[600],
          },
        },
      },
    },
  };
};
