import { css } from "@emotion/react";
import { Fab, useTheme } from "@material-ui/core";
import { forwardRef } from "react";

const displayName = "ScreenFab";

const ScreenFab = forwardRef((props, ref) => {
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

ScreenFab.displayName = displayName;

export default ScreenFab;
