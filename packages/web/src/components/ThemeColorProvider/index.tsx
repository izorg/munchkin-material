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

    node.setAttribute(
      "content",
      rgbToHex(darken(palette.background.default, 0.5)),
    );
  }, [palette.background.default]);

  return null;
};

export default ThemeColorProvider;
