import { GlobalStyles } from "@mui/material";

export const Insets = () => {
  if (cordova.platformId === "android") {
    return (
      <GlobalStyles
        styles={{
          ":root": {
            "--inset-bottom": "0px",
            "--inset-left": "0px",
            "--inset-right": "0px",
            "--inset-top": "0px",
          },
        }}
      />
    );
  }

  return null;
};
