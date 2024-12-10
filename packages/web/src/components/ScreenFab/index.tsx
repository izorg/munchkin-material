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
              sm: `calc(${theme.spacing(3)} + var(--inset-bottom))`,
              xs: `calc(${theme.spacing(2)} + var(--inset-bottom))`,
            },
            left: "auto",
            position: "fixed",
            zIndex: 2,
          }),
          (theme) => ({
            '[dir="ltr"] &': {
              left: "auto /*! @noflip */",
              right: {
                sm: `calc(${theme.spacing(3)} + var(--inset-right)) /*! @noflip */`,
                xs: `calc(${theme.spacing(2)} + var(--inset-right)) /*! @noflip */`,
              },
            },
            '[dir="rtl"] &': {
              left: {
                sm: `calc(${theme.spacing(3)} + var(--inset-left)) /*! @noflip */`,
                xs: `calc(${theme.spacing(2)} + var(--inset-left)) /*! @noflip */`,
              },
              right: "auto /*! @noflip */",
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
