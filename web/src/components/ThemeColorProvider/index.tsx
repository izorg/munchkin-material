import { useTheme } from "@mui/material";
import { useEffect } from "react";

const ThemeColorProvider = () => {
  const { palette } = useTheme();

  const color =
    palette.mode === "dark" ? palette.common.black : palette.primary.dark;

  useEffect(() => {
    let node = document.querySelector('meta[name="theme-color"]');

    if (!node) {
      node = document.createElement("meta");

      node.setAttribute("name", "theme-color");

      document.head.append(node);
    }

    node.setAttribute("content", color);
  }, [color]);

  return null;
};

export default ThemeColorProvider;
