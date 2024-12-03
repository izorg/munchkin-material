/// <reference types="cordova-plugin-statusbar" />

import { darken, rgbToHex, useTheme } from "@mui/material";
import { useEffect } from "react";

import usePresentSelector from "../../../../web/src/hooks/usePresentSelector";

export const useStatusBar = () => {
  const { palette } = useTheme();

  const pureBlack = usePresentSelector((state) => state.theme.pureBlack);

  useEffect(() => {
    if (cordova.platformId === "android") {
      setTimeout(() => {
        window.StatusBar.backgroundColorByHexString(
          palette.mode === "dark" && pureBlack
            ? palette.background.default
            : rgbToHex(darken(palette.primary.main, 0.5)),
        );
      }, 100);
    }
  }, [
    palette.background.default,
    palette.mode,
    palette.primary.main,
    pureBlack,
  ]);

  useEffect(() => {
    if (cordova.platformId === "ios") {
      if (palette.mode === "dark") {
        window.StatusBar.styleLightContent();
      } else {
        window.StatusBar.styleDefault();
      }
    }
  }, [palette.mode]);
};
