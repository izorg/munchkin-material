import { darken, rgbToHex, useTheme } from "@mui/material";
import { useEffect } from "react";

import { usePreviewTheme } from "@munchkin/web";

import { getAndroidVersion } from "./android";

export const useStatusBar = () => {
  const { palette } = useTheme();

  const { pureBlack } = usePreviewTheme();

  useEffect(() => {
    if (globalThis.cordova.platformId !== "android") {
      return;
    }

    const canEdgeToEdge = getAndroidVersion() >= 15;

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

    document.addEventListener("resume", setStatusbarColors, false);

    const timeout = globalThis.setTimeout(setStatusbarColors, 1000);

    return () => {
      document.removeEventListener("resume", setStatusbarColors, false);

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
