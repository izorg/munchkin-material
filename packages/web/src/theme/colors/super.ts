import { type PaletteMode } from "@mui/material";
import { yellow } from "@mui/material/colors";
import { defineMessage } from "react-intl";

export const key = "super";

export const name = defineMessage({
  defaultMessage: "Super",
  id: "theme.name.super",
});

export const getTheme = (mode: PaletteMode) => {
  const color = yellow[mode === "light" ? 600 : 200];

  return {
    components: {
      MuiAvatar: {
        styleOverrides: {
          colorDefault: {
            backgroundColor: color,
          },
        },
      },
    },

    palette: {
      primary: {
        main: color,
      },
    },
  };
};
