import { darken, rgbToHex, useTheme } from "@mui/material";
import { useMemo } from "react";

import usePresentSelector from "../../hooks/usePresentSelector";

export const useThemeColor = () => {
  const { palette } = useTheme();

  const pureBlack = usePresentSelector((state) => state.theme.pureBlack);

  return useMemo(
    () =>
      palette.mode === "dark" && pureBlack
        ? palette.background.default
        : rgbToHex(darken(palette.primary.main, 0.5)),
    [palette.background.default, palette.mode, palette.primary.main, pureBlack],
  );
};
