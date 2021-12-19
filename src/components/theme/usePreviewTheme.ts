import { useMemo } from "react";
import { useLocation } from "react-router-dom";

import { type ThemeState } from "../../ducks/theme";
import usePresentSelector from "../../utils/usePresentSelector";

const usePreviewTheme = (): ThemeState => {
  const location = useLocation();

  const storeTheme = usePresentSelector((state) => state.theme);

  const searchParams = new URLSearchParams(location.search);

  const id = searchParams.get("id");
  const mode = searchParams.get("mode");
  const pureBlack = searchParams.get("pureBlack");

  return useMemo(() => {
    const previewTheme: Partial<ThemeState> = {};

    if (id) {
      previewTheme.id = id;
    }

    if (mode) {
      if (mode === "auto") {
        previewTheme.mode = undefined;
      } else if (mode === "light" || mode === "dark") {
        previewTheme.mode = mode;
      }
    }

    if (pureBlack) {
      if (pureBlack === "false") {
        previewTheme.pureBlack = false;
      } else if (pureBlack === "true") {
        previewTheme.pureBlack = true;
      }
    }

    return {
      ...storeTheme,
      ...previewTheme,
    };
  }, [id, mode, pureBlack, storeTheme]);
};

export default usePreviewTheme;
