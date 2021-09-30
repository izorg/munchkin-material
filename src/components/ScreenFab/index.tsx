import { css } from "@emotion/react";
import { Fab, FabProps, useTheme } from "@mui/material";
import { forwardRef, ForwardRefRenderFunction } from "react";

const ScreenFab: ForwardRefRenderFunction<HTMLButtonElement, FabProps> = (
  props,
  ref
) => {
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
};

export default forwardRef(ScreenFab);
