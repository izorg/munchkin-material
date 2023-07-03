import { Fade, type FadeProps, Slide, type SlideProps } from "@mui/material";
import { forwardRef, useEffect } from "react";

import { ios } from "../../utils/platforms";

import { useFullScreen } from "./useFullScreen";

let appear = false;

export const PlayerDialogTransition = forwardRef<
  HTMLDivElement,
  FadeProps | SlideProps
>(function PlayerDialogTransition(props, ref) {
  const { children } = props;

  const fullScreen = useFullScreen();

  useEffect(() => {
    appear = true;
  }, []);

  if (fullScreen && ios) {
    return (
      <Slide ref={ref} appear={appear} direction="up" {...props}>
        {children}
      </Slide>
    );
  }

  return (
    <Fade ref={ref} appear={appear} {...props}>
      {children}
    </Fade>
  );
});
