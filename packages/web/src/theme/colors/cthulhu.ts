import { type CssVarsThemeOptions } from "@mui/material";
import { lightGreen } from "@mui/material/colors";
import { defineMessage } from "react-intl";

export const key = "cthulhu";

// eslint-disable-next-line formatjs/enforce-id
export const name = defineMessage({
  defaultMessage: "Cthulhu",
  id: "theme.name.cthulhu",
});

export const getTheme = (): CssVarsThemeOptions => {
  return {
    colorSchemes: {
      dark: {
        palette: {
          primary: {
            main: lightGreen[200],
          },
        },
      },
      light: {
        palette: {
          primary: {
            main: lightGreen[700],
          },
        },
      },
    },
  };
};
