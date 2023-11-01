import { type Theme, useMediaQuery } from "@mui/material";

export const useFullScreen = () =>
  useMediaQuery<Theme>((theme) => theme.breakpoints.down("lg"));
