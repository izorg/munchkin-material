import { Dialog, type DialogProps } from "@mui/material";
import { useEffect } from "react";

import { ScreenDialogPaper } from "./ScreenDialogPaper";
import { ScreenDialogTransition } from "./ScreenDialogTransition";

let initialRender = true;

const ScreenDialog = (props: DialogProps) => {
  const { slotProps, slots, ...rest } = props;

  useEffect(() => {
    initialRender = false;
  }, []);

  return (
    <Dialog
      fullScreen
      hideBackdrop
      PaperComponent={ScreenDialogPaper}
      slotProps={{
        ...slotProps,
        transition: {
          appear: !initialRender,
          ...slotProps?.transition,
        },
      }}
      slots={{
        transition: ScreenDialogTransition,
        ...slots,
      }}
      {...rest}
    />
  );
};

export default ScreenDialog;
