import { type CssVarsThemeOptions } from "@mui/material";
import { lightBlue } from "@mui/material/colors";
import { defineMessage } from "react-intl";

export const key = "star";

// eslint-disable-next-line formatjs/enforce-id
export const name = defineMessage({
  defaultMessage: "Star",
  id: "theme.name.star",
});

export const getTheme = (): CssVarsThemeOptions => {
  return {
    colorSchemes: {
      dark: {
        palette: {
          primary: {
            main: lightBlue[200],
          },
        },
      },
      light: {
        palette: {
          primary: {
            main: lightBlue[600],
          },
        },
      },
    },
  };
};
