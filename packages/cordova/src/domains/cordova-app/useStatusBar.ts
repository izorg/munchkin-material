/// <reference types="cordova-plugin-statusbar" />

import { darken, rgbToHex, useTheme } from "@mui/material";
import { useEffect } from "react";

import usePresentSelector from "@munchkin/web/src/hooks/usePresentSelector";

export const useStatusBar = () => {
  const { palette } = useTheme();

  const pureBlack = usePresentSelector((state) => state.theme.pureBlack);

  useEffect(() => {
    if (cordova.platformId === "android") {
      setTimeout(() => {
        globalThis.StatusBar.backgroundColorByHexString(
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
        globalThis.StatusBar.styleLightContent();
      } else {
        globalThis.StatusBar.styleDefault();
      }
    }
  }, [palette.mode]);
};
