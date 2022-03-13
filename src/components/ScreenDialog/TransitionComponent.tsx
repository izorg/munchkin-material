import { Fade, Slide, type Theme, useMediaQuery } from "@mui/material";
import { type TransitionProps } from "@mui/material/transitions";
import { type ReactElement, type VFC } from "react";

import { ios } from "../../utils/platforms";

const TransitionComponent: VFC<TransitionProps & { children: ReactElement }> = (
  props
) => {
  const slide =
    useMediaQuery<Theme>((theme) => theme.breakpoints.down("lg")) && ios;

  if (slide) {
    return <Slide direction="left" {...props} />;
  }

  return <Fade {...props} />;
};

export default TransitionComponent;
