import { darken, rgbToHex, useTheme } from "@mui/material";
import { useEffect } from "react";

const ThemeColorProvider = () => {
  const { palette } = useTheme();

  useEffect(() => {
    let node = document.querySelector('meta[name="theme-color"]');

    if (!node) {
      node = document.createElement("meta");

      node.setAttribute("name", "theme-color");

      document.head.append(node);
    }

    const color =
      palette.mode === "dark"
        ? palette.common.black
        : rgbToHex(darken(palette.primary.main, 0.5));

    node.setAttribute("content", color);
  }, [palette.common.black, palette.mode, palette.primary.main]);

  return null;
};

export default ThemeColorProvider;
