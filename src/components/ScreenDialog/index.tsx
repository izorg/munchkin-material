import { Dialog, type DialogProps } from "@mui/material";

import TransitionComponent from "./TransitionComponent";

const ScreenDialog = (props: DialogProps) => (
  <Dialog
    fullScreen
    hideBackdrop
    PaperProps={{
      elevation: 0,
      ...props.PaperProps,
    }}
    TransitionComponent={TransitionComponent}
    {...props}
  />
);

export default ScreenDialog;
