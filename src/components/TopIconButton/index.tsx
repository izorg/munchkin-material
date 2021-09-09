import { css } from "@emotion/react";
import {
  IconButton,
  IconButtonProps,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef } from "react";

const TopIconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    const theme = useTheme();

    const upMd = useMediaQuery(theme.breakpoints.up("md"));

    const { edge } = props;

    return (
      <IconButton
        ref={ref}
        css={[
          css`
            padding: ${upMd ? 12 : 8}px;
          `,
          edge === "start" &&
            css`
              margin-left: ${upMd ? -12 : -8}px;
            `,
          edge === "end" &&
            css`
              margin-left: ${upMd ? 12 : 16}px;
              margin-right: ${upMd ? -12 : -8}px;
            `,
        ]}
        {...props}
      />
    );
  }
);

TopIconButton.propTypes = {
  edge: PropTypes.oneOf([false, "start", "end"]),
};

TopIconButton.displayName = "TopIconButton";

export default TopIconButton;
