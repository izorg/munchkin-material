import { Fade, Slide, type Theme, useMediaQuery } from "@mui/material";
import { type TransitionProps } from "@mui/material/transitions";
import { forwardRef, type ReactElement } from "react";
import { type Transition } from "react-transition-group";

import { ios } from "../../utils/platforms";

const TransitionComponent = forwardRef<
  typeof Transition,
  TransitionProps & { children: ReactElement }
>(function TransitionComponent(props, ref) {
  const slide =
    useMediaQuery<Theme>((theme) => theme.breakpoints.down("lg")) && ios;

  if (slide) {
    return <Slide ref={ref} direction="left" {...props} />;
  }

  return <Fade ref={ref} {...props} />;
});

export default TransitionComponent;
