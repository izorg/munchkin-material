import {
  Fade,
  Modal,
  type ModalProps,
  Paper,
  Slide,
  useMediaQuery,
} from "@mui/material";
import { type TransitionProps } from "@mui/material/transitions";
import { type ReactElement } from "react";

import { ios } from "../../utils/platforms";

import { useInitialAppear } from "./useInitialAppear";

type RouteModalTransitionProps = { children: ReactElement } & Omit<
  TransitionProps,
  "children"
>;

const RouteModalTransition = ({
  appear: appearProps,
  ...rest
}: RouteModalTransitionProps) => {
  const appear = useInitialAppear(appearProps);

  const slide = useMediaQuery((theme) => theme.breakpoints.down("lg")) && ios;

  if (slide) {
    return <Slide appear={appear} direction="left" {...rest} />;
  }

  return <Fade appear={appear} {...rest} />;
};

export const RouteModal = ({ children, open, ...rest }: ModalProps) => (
  <Modal hideBackdrop open={open} {...rest}>
    <RouteModalTransition in={open}>
      <Paper
        elevation={0}
        sx={[
          {
            display: "flex",
            flexDirection: "column",
            inset: 0,
            position: "fixed",
          },
        ]}
      >
        {children}
      </Paper>
    </RouteModalTransition>
  </Modal>
);
