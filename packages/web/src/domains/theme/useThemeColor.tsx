import { darken, rgbToHex, useTheme } from "@mui/material";
import { useMemo } from "react";

import usePreviewTheme from "../../hooks/usePreviewTheme";

export const useThemeColor = () => {
  const { palette } = useTheme();

  const { pureBlack } = usePreviewTheme();

  return useMemo(
    () =>
      pureBlack && palette.mode === "dark"
        ? palette.background.default
        : rgbToHex(darken(palette.primary.main, 0.5)),
    [palette.background.default, palette.mode, palette.primary.main, pureBlack],
  );
};
