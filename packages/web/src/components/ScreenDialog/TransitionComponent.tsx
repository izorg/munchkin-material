import { Fade, Slide, useMediaQuery } from "@mui/material";
import { type TransitionProps } from "@mui/material/transitions";
import { type ReactElement } from "react";

import { ios } from "../../utils/platforms";

const TransitionComponent = (
  props: { children: ReactElement } & Omit<TransitionProps, "children">,
) => {
  const slide = useMediaQuery((theme) => theme.breakpoints.down("lg")) && ios;

  if (slide) {
    return <Slide direction="left" {...props} />;
  }

  return <Fade {...props} />;
};

export default TransitionComponent;
