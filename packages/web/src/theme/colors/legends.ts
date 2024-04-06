import { type CssVarsThemeOptions } from "@mui/material";
import { grey } from "@mui/material/colors";
import { defineMessage } from "react-intl";

export const key = "legends";

// eslint-disable-next-line formatjs/enforce-id
export const name = defineMessage({
  defaultMessage: "Legends",
  id: "theme.name.legends",
});

export const getTheme = (): CssVarsThemeOptions => {
  return {
    colorSchemes: {
      dark: {
        palette: {
          primary: {
            main: grey[200],
          },
        },
      },
      light: {
        palette: {
          primary: {
            main: grey[700],
          },
        },
      },
    },
  };
};
