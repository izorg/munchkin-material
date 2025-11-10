import { Fade, type FadeProps, Slide, type SlideProps } from "@mui/material";
import { useEffect } from "react";

import { ios } from "../../utils/platforms";

import { useFullScreen } from "./useFullScreen";

let appear = false;

export const PlayerDialogTransition = (props: FadeProps | SlideProps) => {
  const { children } = props;

  const fullScreen = useFullScreen();

  useEffect(() => {
    appear = true;
  }, []);

  if (fullScreen && ios) {
    return (
      <Slide appear={appear} direction="up" {...props}>
        {children}
      </Slide>
    );
  }

  return (
    <Fade appear={appear} {...props}>
      {children}
    </Fade>
  );
};
