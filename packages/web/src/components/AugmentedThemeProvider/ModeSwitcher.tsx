import { useColorScheme } from "@mui/material";
import { useEffect } from "react";

import usePreviewTheme from "../../hooks/usePreviewTheme";

export const ModeSwitcher = () => {
  const { setMode } = useColorScheme();

  const previewTheme = usePreviewTheme();

  useEffect(() => {
    setMode(previewTheme.mode ?? "system");
  }, [previewTheme.mode, setMode]);

  return null;
};
