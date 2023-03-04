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
      sx={{
        bottom: theme.spacing(2),
        position: "fixed",
        right: theme.spacing(2),
        zIndex: 2,

        [theme.breakpoints.up("sm")]: {
          bottom: theme.spacing(3),
          right: theme.spacing(3),

          // eslint-disable-next-line sort-keys
          "@supports (padding: max(0px))": {
            right: `max(${theme.spacing(3)}, env(safe-area-inset-right))`,
          },
        },
      }}
      {...props}
    />
  );
});

export default ScreenFab;
