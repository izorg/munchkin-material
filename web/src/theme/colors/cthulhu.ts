import { type PaletteMode } from "@mui/material";
import { lightGreen } from "@mui/material/colors";
import { defineMessage } from "react-intl";

export const key = "cthulhu";

export const name = defineMessage({
  defaultMessage: "Cthulhu",
  id: "theme.name.cthulhu",
});

export const getTheme = (mode: PaletteMode) => {
  const color = lightGreen[mode === "light" ? 700 : 200];

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
