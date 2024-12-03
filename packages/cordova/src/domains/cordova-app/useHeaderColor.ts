import { darken, rgbToHex, useTheme } from "@mui/material";
import { useEffect } from "react";

export const useHeaderColor = () => {
  const theme = useTheme();

  useEffect(() => {
    if (cordova.platformId === "android") {
      window.plugins?.headerColor?.tint(
        rgbToHex(darken(theme.palette.primary.main, 0.5)),
      );
    }
  }, [theme.palette.primary.main]);
};
