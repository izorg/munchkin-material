import { darken, rgbToHex, useTheme } from "@mui/material";
import { useEffect } from "react";

const StatusBarProvider = () => {
  const theme = useTheme();

  useEffect(() => {
    if (cordova.platformId === "android") {
      setTimeout(() => {
        StatusBar.backgroundColorByHexString(
          rgbToHex(darken(theme.palette.primary.main, 0.5)),
        );
      }, 100);
    }
  }, [theme.palette.primary.main]);

  useEffect(() => {
    if (cordova.platformId === "ios") {
      if (theme.palette.mode === "dark") {
        StatusBar.styleLightContent();
      } else {
        StatusBar.styleDefault();
      }
    }
  }, [theme.palette.mode]);

  return null;
};

export default StatusBarProvider;
