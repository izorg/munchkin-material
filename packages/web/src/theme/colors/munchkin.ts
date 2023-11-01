import { type PaletteMode } from "@mui/material";
import { brown } from "@mui/material/colors";
import { defineMessage } from "react-intl";

export const key = "munchkin";

export const name = defineMessage({
  defaultMessage: "Munchkin",
  id: "theme.name.munchkin",
});

export const getTheme = (mode: PaletteMode) => {
  const color = brown[mode === "light" ? 500 : 200];

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
