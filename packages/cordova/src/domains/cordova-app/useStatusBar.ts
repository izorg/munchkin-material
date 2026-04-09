import { darken, rgbToHex, useTheme } from "@mui/material";
import { useEffect } from "react";

import { usePreviewTheme } from "@munchkin/web";

export const useStatusBar = () => {
  const { palette } = useTheme();

  const { pureBlack } = usePreviewTheme();

  useEffect(() => {
    if (globalThis.cordova.platformId !== "android") {
      return;
    }

    const androidVersion = Number.parseInt(device.version.split(".")[0], 10);
    const canEdgeToEdge = androidVersion >= 15;

    const setStatusbarColors = () => {
      globalThis.statusbar.setBackgroundColor(
        palette.mode === "dark" && pureBlack
          ? palette.background.default
          : rgbToHex(darken(palette.primary.main, 0.5)),
      );

      if (!canEdgeToEdge || palette.mode === "dark") {
        globalThis.StatusBar.styleLightContent();
      } else {
        globalThis.StatusBar.styleDefault();
      }
    };

    setStatusbarColors();

    const timeout = globalThis.setTimeout(setStatusbarColors, 1000);

    return () => {
      globalThis.clearTimeout(timeout);
    };
  }, [
    palette.background.default,
    palette.mode,
    palette.primary.main,
    pureBlack,
  ]);

  useEffect(() => {
    if (globalThis.cordova.platformId === "ios") {
      if (palette.mode === "dark") {
        globalThis.StatusBar.styleLightContent();
      } else {
        globalThis.StatusBar.styleDefault();
      }
    }
  }, [palette.mode]);
};
