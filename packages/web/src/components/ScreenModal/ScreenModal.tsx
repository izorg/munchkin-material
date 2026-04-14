import { Modal, type ModalProps, Paper } from "@mui/material";

import { ScreenModalTransition } from "./ScreenModalTransition";

export const ScreenModal = ({ children, open, ...rest }: ModalProps) => (
  <Modal hideBackdrop open={open} {...rest}>
    <ScreenModalTransition in={open}>
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
