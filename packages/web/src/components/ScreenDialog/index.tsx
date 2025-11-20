import { Dialog, type DialogProps } from "@mui/material";
import { useEffect } from "react";

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
      slotProps={{
        ...slotProps,
        paper: {
          elevation: 0,
          ...slotProps?.paper,
        },
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
