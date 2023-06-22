import { Fab, type FabProps, useTheme } from "@mui/material";
import { forwardRef } from "react";

const ScreenFab = forwardRef<HTMLButtonElement, FabProps>(function ScreenFab(
  props,
  ref
) {
  const theme = useTheme();

  return (
    <Fab
      ref={ref}
      color="primary"
      sx={[
        {
          bottom: {
            sm: theme.spacing(3),
            xs: theme.spacing(2),
          },
          position: "fixed",
          right: {
            sm: theme.spacing(3),
            xs: theme.spacing(2),
          },
          zIndex: 2,
        },
        {
          "@supports (padding: max(0px))": {
            right: {
              sm: `max(${theme.spacing(3)}, env(safe-area-inset-right))`,
            },
          },
        },
      ]}
      {...props}
    />
  );
});

export default ScreenFab;
