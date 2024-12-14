import { useTheme } from "@mui/material";
import { useEffect } from "react";

declare global {
  interface Window {
    Keyboard?: {
      setKeyboardStyle: (color: "dark" | "light") => void;
    };
  }
}

export const useKeyboardStyle = () => {
  const theme = useTheme();

  useEffect(() => {
    if (cordova.platformId !== "ios") {
      return;
    }

    if (window.Keyboard?.setKeyboardStyle) {
      window.Keyboard.setKeyboardStyle(theme.palette.mode);
    }
  }, [theme.palette.mode]);
};
