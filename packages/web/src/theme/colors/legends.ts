import { type PaletteMode } from "@mui/material";
import { grey } from "@mui/material/colors";
import { defineMessage } from "react-intl";

export const key = "legends";

export const name = defineMessage({
  defaultMessage: "Legends",
  id: "theme.name.legends",
});

export const getTheme = (mode: PaletteMode) => {
  const color = grey[mode === "light" ? 700 : 200];

  return {
    palette: {
      primary: {
        main: color,
      },
    },
  };
};
