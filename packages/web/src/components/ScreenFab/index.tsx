import { Fab, type FabProps } from "@mui/material";
import { forwardRef } from "react";

const ScreenFab = forwardRef<HTMLButtonElement, FabProps>(
  function ScreenFab(props, ref) {
    const { sx = [], ...rest } = props;

    return (
      <Fab
        color="primary"
        ref={ref}
        sx={[
          (theme) => ({
            bottom: {
              sm: theme.spacing(3),
              xs: theme.spacing(2),
            },
            left: "auto",
            position: "fixed",
            right: {
              sm: theme.spacing(3),
              xs: theme.spacing(2),
            },
            zIndex: 2,
          }),
          (theme) => ({
            "@supports (padding: max(0px))": {
              '[dir="ltr"] &': {
                left: "auto /*! @noflip */",
                right: {
                  sm: `max(${theme.spacing(
                    3,
                  )}, env(safe-area-inset-right)) /*! @noflip */`,
                  xs: `max(${theme.spacing(
                    2,
                  )}, env(safe-area-inset-right)) /*! @noflip */`,
                },
              },
              '[dir="rtl"] &': {
                left: {
                  sm: `max(${theme.spacing(
                    3,
                  )}, env(safe-area-inset-left)) /*! @noflip */`,
                  xs: `max(${theme.spacing(
                    2,
                  )}, env(safe-area-inset-left)) /*! @noflip */`,
                },
                right: "auto /*! @noflip */",
              },
            },
          }),
          ...(sx instanceof Array ? sx : [sx]),
        ]}
        {...rest}
      />
    );
  },
);

export default ScreenFab;
