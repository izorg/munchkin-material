import { type CssVarsThemeOptions } from "@mui/material";
import { orange } from "@mui/material/colors";
import { defineMessage } from "react-intl";

export const key = "apocalypse";

export const name = defineMessage({
  defaultMessage: "Apocalypse",
  id: "theme.name.apocalypse",
});

export const getTheme = (): CssVarsThemeOptions => {
  return {
    colorSchemes: {
      dark: {
        palette: {
          primary: {
            main: orange[200],
          },
        },
      },
      light: {
        palette: {
          primary: {
            main: orange[800],
          },
        },
      },
    },
  };
};
