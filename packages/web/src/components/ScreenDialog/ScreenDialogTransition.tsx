import { Fade, Slide, useMediaQuery } from "@mui/material";
import { type TransitionProps } from "@mui/material/transitions";
import { type ReactElement, useEffect } from "react";

import { ios } from "../../utils/platforms";

let initialRender = true;

type ScreenDialogTransitionProps = { children: ReactElement } & Omit<
  TransitionProps,
  "children"
>;

export const ScreenDialogTransition = ({
  appear: appearProps,
  ...rest
}: ScreenDialogTransitionProps) => {
  useEffect(() => {
    initialRender = false;
  }, []);

  const appear = initialRender ? false : appearProps;

  const slide = useMediaQuery((theme) => theme.breakpoints.down("lg")) && ios;

  if (slide) {
    return <Slide appear={appear} direction="left" {...rest} />;
  }

  return <Fade appear={appear} {...rest} />;
};
