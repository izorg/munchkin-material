import { useTheme } from "@mui/material";
import { useEffect } from "react";

declare global {
  var Keyboard:
    | {
        setKeyboardStyle: (color: "dark" | "light") => void;
      }
    | undefined;
}

export const useKeyboardStyle = () => {
  const theme = useTheme();

  useEffect(() => {
    if (cordova.platformId !== "ios") {
      return;
    }

    if (globalThis.Keyboard?.setKeyboardStyle) {
      globalThis.Keyboard.setKeyboardStyle(theme.palette.mode);
    }
  }, [theme.palette.mode]);
};
