import { Dialog, type DialogProps } from "@mui/material";

import { useInitialRender } from "../../hooks/useInitialRender";

import TransitionComponent from "./TransitionComponent";

const ScreenDialog = (props: DialogProps) => {
  const initialRender = useInitialRender();

  return (
    <Dialog
      fullScreen
      hideBackdrop
      PaperProps={{
        elevation: 0,
        ...props.PaperProps,
      }}
      TransitionComponent={TransitionComponent}
      TransitionProps={{
        appear: !initialRender,
      }}
      {...props}
    />
  );
};

export default ScreenDialog;
