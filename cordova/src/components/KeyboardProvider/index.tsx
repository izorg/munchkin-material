import { useTheme } from "@mui/material";
import { useEffect } from "react";

import { ios } from "@munchkin/web/src/utils/platforms";

const KeyboardProvider = () => {
  const theme = useTheme();

  useEffect(() => {
    const Keyboard = window.Keyboard;

    if (Keyboard && Keyboard.setKeyboardStyle && ios) {
      Keyboard.setKeyboardStyle(theme.palette.mode); // cordova ios
    }
  }, [theme.palette.mode]);

  return null;
};

export default KeyboardProvider;
