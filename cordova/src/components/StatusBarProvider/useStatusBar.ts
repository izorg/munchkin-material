import { darken, rgbToHex, type Theme } from "@mui/material";
import { dark, light } from "@mui/material/styles/createPalette";
import { useEffect } from "react";

const useStatusBar = (theme: Theme): void => {
  useEffect(() => {
    const colorPrimary = theme.components?.MuiAppBar?.styleOverrides
      ?.colorPrimary as Record<string, string> | undefined;

    const text = colorPrimary?.color || theme.palette.primary.contrastText;

    if (theme.palette.mode === "dark") {
      StatusBar.styleLightContent();
    } else {
      if (text === light.text.primary) {
        StatusBar.styleDefault();
      }

      if (text === dark.text.primary) {
        StatusBar.styleLightContent();
      }
    }

    if (cordova.platformId === "android") {
      let background =
        colorPrimary?.backgroundColor || theme.palette.primary.main;

      if (theme.palette.mode === "dark") {
        background = theme.palette.grey[900];
      }

      setTimeout(() => {
        StatusBar.backgroundColorByHexString(rgbToHex(darken(background, 0.5)));
      }, 0);
    }
  }, [
    theme.components?.MuiAppBar?.styleOverrides?.colorPrimary,
    theme.palette.grey,
    theme.palette.mode,
    theme.palette.primary.contrastText,
    theme.palette.primary.main,
  ]);
};

export default useStatusBar;
