import { useTheme } from "@mui/material";
import { useEffect } from "react";

export const useKeyboardStyle = () => {
  const theme = useTheme();

  useEffect(() => {
    if (globalThis.cordova.platformId === "ios") {
      globalThis.Keyboard?.setKeyboardStyle(theme.palette.mode);
    }
  }, [theme.palette.mode]);
};
