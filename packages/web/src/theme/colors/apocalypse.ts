import { type PaletteMode } from "@mui/material";
import { orange } from "@mui/material/colors";
import { defineMessage } from "react-intl";

export const key = "apocalypse";

export const name = defineMessage({
  defaultMessage: "Apocalypse",
  id: "theme.name.apocalypse",
});

export const getTheme = (mode: PaletteMode) => {
  const color = orange[mode === "light" ? 800 : 200];

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
