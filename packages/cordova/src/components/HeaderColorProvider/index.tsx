import { darken, rgbToHex, useTheme } from "@mui/material";
import { useEffect } from "react";

const HeaderColorProvider = () => {
  const theme = useTheme();

  useEffect(() => {
    if (cordova.platformId === "android") {
      window.plugins?.headerColor?.tint(
        rgbToHex(darken(theme.palette.primary.main, 0.5)),
      );
    }
  }, [theme.palette.primary.main]);

  return null;
};

export default HeaderColorProvider;
