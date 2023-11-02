import { type PaletteMode } from "@mui/material";
import { red } from "@mui/material/colors";
import { defineMessage } from "react-intl";

export const key = "booty";

export const name = defineMessage({
  defaultMessage: "Booty",
  id: "theme.name.booty",
});

export const getTheme = (mode: PaletteMode) => {
  const color = red[mode === "light" ? 700 : 200];

  return {
    palette: {
      primary: {
        main: color,
      },
    },
  };
};
