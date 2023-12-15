import { useColorScheme } from "@mui/material";
import { useEffect } from "react";

import usePreviewTheme from "../../hooks/usePreviewTheme";

export const ModeProvider = () => {
  const { setMode } = useColorScheme();

  const previewTheme = usePreviewTheme();

  const themeMode = previewTheme.mode ?? "system";

  useEffect(() => {
    setMode(themeMode);
  }, [setMode, themeMode]);

  return null;
};
