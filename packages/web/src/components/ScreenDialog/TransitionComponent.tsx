import { Fade, Slide, type Theme, useMediaQuery } from "@mui/material";
import { type TransitionProps } from "@mui/material/transitions";
import { forwardRef, type ReactElement } from "react";
import { type Transition } from "react-transition-group";

import { ios } from "../../utils/platforms";

const TransitionComponent = forwardRef<
  typeof Transition,
  { children: ReactElement } & Omit<TransitionProps, "children">
>(function TransitionComponent(props, ref) {
  const slide =
    useMediaQuery<Theme>((theme) => theme.breakpoints.down("lg")) && ios;

  if (slide) {
    return <Slide direction="left" ref={ref} {...props} />;
  }

  return <Fade ref={ref} {...props} />;
});

export default TransitionComponent;
