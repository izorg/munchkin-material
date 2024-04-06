import { type CssVarsThemeOptions } from "@mui/material";
import { red } from "@mui/material/colors";
import { defineMessage } from "react-intl";

export const key = "booty";

// eslint-disable-next-line formatjs/enforce-id
export const name = defineMessage({
  defaultMessage: "Booty",
  id: "theme.name.booty",
});

export const getTheme = (): CssVarsThemeOptions => {
  return {
    colorSchemes: {
      dark: {
        palette: {
          primary: {
            main: red[200],
          },
        },
      },
      light: {
        palette: {
          primary: {
            main: red[700],
          },
        },
      },
    },
  };
};
