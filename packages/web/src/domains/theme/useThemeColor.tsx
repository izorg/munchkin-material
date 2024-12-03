import { darken, rgbToHex, useTheme } from "@mui/material";
import { useEffect } from "react";

import usePresentSelector from "../../hooks/usePresentSelector";

const getThemeColorNode = () => {
  let node = document.querySelector('meta[name="theme-color"]');

  if (!node) {
    node = document.createElement("meta");

    node.setAttribute("name", "theme-color");

    document.head.append(node);
  }

  return node;
};

export const useThemeColor = () => {
  const { palette } = useTheme();

  const pureBlack = usePresentSelector((state) => state.theme.pureBlack);

  useEffect(() => {
    const node = getThemeColorNode();

    node.setAttribute(
      "content",
      palette.mode === "dark" && pureBlack
        ? palette.background.default
        : rgbToHex(darken(palette.primary.main, 0.5)),
    );
  }, [
    palette.background.default,
    palette.mode,
    palette.primary.main,
    pureBlack,
  ]);
};
