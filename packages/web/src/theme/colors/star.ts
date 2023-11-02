import { type PaletteMode } from "@mui/material";
import { lightBlue } from "@mui/material/colors";
import { defineMessage } from "react-intl";

export const key = "star";

export const name = defineMessage({
  defaultMessage: "Star",
  id: "theme.name.star",
});

export const getTheme = (mode: PaletteMode) => {
  const color = lightBlue[mode === "light" ? 600 : 200];

  return {
    palette: {
      primary: {
        main: color,
      },
    },
  };
};
