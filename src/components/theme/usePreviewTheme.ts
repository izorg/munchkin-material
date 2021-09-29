import { useMemo } from "react";
import { useLocation } from "react-router-dom";

import type { ThemeState } from "../../ducks/theme";
import usePresentSelector from "../../utils/usePresentSelector";

const usePreviewTheme = (): ThemeState => {
  const location = useLocation();

  const storeTheme = usePresentSelector((state) => state.theme);

  const previewTheme = useMemo(() => {
    const preview: Partial<ThemeState> = {};

    const searchParams = new URLSearchParams(location.search);

    const id = searchParams.get("id");
    const mode = searchParams.get("mode");
    const pureBlack = searchParams.get("pureBlack");

    if (id) {
      preview.id = id;
    }

    if (mode) {
      if (mode === "auto") {
        preview.mode = undefined;
      } else if (mode === "light" || mode === "dark") {
        preview.mode = mode;
      }
    }

    if (pureBlack) {
      if (pureBlack === "false") {
        preview.pureBlack = false;
      } else if (pureBlack === "true") {
        preview.pureBlack = true;
      }
    }

    return preview;
  }, [location.search]);

  return {
    ...storeTheme,
    ...previewTheme,
  };
};

export default usePreviewTheme;
