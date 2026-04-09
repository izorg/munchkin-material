import { GlobalStyles } from "@mui/material";

export const Insets = () => {
  if (globalThis.cordova.platformId === "android") {
    return (
      <GlobalStyles
        styles={{
          ":root": {
            "--inset-bottom": "var(--safe-area-inset-bottom, 0px)",
            "--inset-left": "var(--safe-area-inset-left, 0px)",
            "--inset-right": "var(--safe-area-inset-right, 0px)",
            "--inset-top": "var(--safe-area-inset-top, 0px)",
          },
        }}
      />
    );
  }

  return null;
};
