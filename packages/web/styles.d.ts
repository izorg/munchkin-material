declare module "@mui/material" {
  interface PaletteDialog {
    fullScreenBg: string;
  }

  interface PaletteOptions {
    Dialog?: PaletteDialog;
  }
  interface Palette {
    Dialog?: PaletteDialog;
  }
}

export {};
