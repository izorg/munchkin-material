import { useTheme } from "@mui/material";
import { useEffect } from "react";

import { ios } from "../../../../web/src/utils/platforms";

export const useKeyboardStyle = () => {
  const theme = useTheme();

  useEffect(() => {
    if (window.Keyboard?.setKeyboardStyle && ios) {
      window.Keyboard.setKeyboardStyle(theme.palette.mode);
    }
  }, [theme.palette.mode]);
};
