import { Modal, type ModalProps, Paper } from "@mui/material";
import { type TransitionProps } from "@mui/material/transitions";

import { ScreenModalTransition } from "./ScreenModalTransition";

type ScreenModalProps = ModalProps & Pick<TransitionProps, "appear">;

export const ScreenModal = ({
  appear = true,
  children,
  open,
  ...rest
}: ScreenModalProps) => (
  <Modal hideBackdrop open={open} {...rest}>
    <ScreenModalTransition appear={appear} in={open}>
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
    </ScreenModalTransition>
  </Modal>
);

export default ScreenModal;
