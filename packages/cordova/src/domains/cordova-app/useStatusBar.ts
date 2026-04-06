import { darken, rgbToHex, useTheme } from "@mui/material";
import { useEffect } from "react";

import { usePreviewTheme } from "@munchkin/web";

export const useStatusBar = () => {
  const { palette } = useTheme();

  const { pureBlack } = usePreviewTheme();

  useEffect(() => {
    if (cordova.platformId === "android") {
      globalThis.statusbar.setBackgroundColor(
        palette.mode === "dark" && pureBlack
          ? palette.background.default
          : rgbToHex(darken(palette.primary.main, 0.5)),
      );
    }
  }, [
    palette.background.default,
    palette.mode,
    palette.primary.main,
    pureBlack,
  ]);
};
