import { useMediaQuery } from "@mui/material";

export const useFullScreen = () =>
  useMediaQuery((theme) => theme.breakpoints.down("lg"));
