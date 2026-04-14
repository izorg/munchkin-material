import { Fade, Slide, useMediaQuery } from "@mui/material";
import { type TransitionProps } from "@mui/material/transitions";
import { type ReactElement } from "react";

import { useInitialAppear } from "../../domains/ui";
import { ios } from "../../utils/platforms";

type ScreenModalTransitionProps = { children: ReactElement } & Omit<
  TransitionProps,
  "children"
>;

export const ScreenModalTransition = ({
  appear: appearProps,
  ...rest
}: ScreenModalTransitionProps) => {
  const appear = useInitialAppear(appearProps);

  const slide = useMediaQuery((theme) => theme.breakpoints.down("lg")) && ios;

  if (slide) {
    return <Slide appear={appear} direction="left" {...rest} />;
  }

  return <Fade appear={appear} {...rest} />;
};
