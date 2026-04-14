import { Dialog, type DialogProps } from "@mui/material";

import { useInitialAppear } from "./useInitialAppear";

export const RouteDialog = ({ slotProps, ...rest }: DialogProps) => {
  const appear = useInitialAppear();

  return (
    <Dialog
      slotProps={{
        ...slotProps,
        backdrop: {
          appear,
          ...slotProps?.backdrop,
        },
        transition: {
          appear,
          ...slotProps?.transition,
        },
      }}
      {...rest}
    />
  );
};
