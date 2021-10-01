import { css } from "@emotion/react";
import { Fab, FabProps, useTheme } from "@mui/material";
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
      css={css`
        bottom: ${theme.spacing(2)};
        position: fixed;
        right: ${theme.spacing(2)};
        z-index: 2;

        ${theme.breakpoints.up("sm")} {
          bottom: ${theme.spacing(3)};
          right: ${theme.spacing(3)};

          @supports (padding: max(0px)) {
            right: max(${theme.spacing(3)}, env(safe-area-inset-right));
          }
        }
      `}
      {...props}
    />
  );
});

export default ScreenFab;
