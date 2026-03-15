import { Dialog, type DialogProps } from "@mui/material";

import { ScreenDialogPaper } from "./ScreenDialogPaper";
import { ScreenDialogTransition } from "./ScreenDialogTransition";

const ScreenDialog = ({ slots, ...rest }: DialogProps) => (
  <Dialog
    fullScreen
    hideBackdrop
    PaperComponent={ScreenDialogPaper}
    slots={{
      transition: ScreenDialogTransition,
      ...slots,
    }}
    {...rest}
  />
);

export default ScreenDialog;
