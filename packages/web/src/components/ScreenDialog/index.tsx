import { Dialog, type DialogProps } from "@mui/material";

import { useInitialRender } from "../../hooks/useInitialRender";

import TransitionComponent from "./TransitionComponent";

const ScreenDialog = (props: DialogProps) => {
  const { slotProps, slots, ...rest } = props;

  const initialRender = useInitialRender();

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
        transition: TransitionComponent,
        ...slots,
      }}
      {...rest}
    />
  );
};

export default ScreenDialog;
