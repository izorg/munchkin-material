import { IconButton, type IconButtonProps } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef } from "react";

const TopIconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function TopIconButton(props, ref) {
    return (
      <IconButton
        ref={ref}
        sx={[
          {
            margin: {
              md: 0,
              xs: "2px",
            },
            padding: {
              md: "12px",
              xs: "8px",
            },
          },
          props.edge === "start" && {
            marginLeft: {
              md: "-12px",
              xs: "-8px",
            },
          },
          props.edge === "end" && {
            marginRight: {
              md: "-12px",
              xs: "-8px",
            },
          },
        ]}
        {...props}
      />
    );
  }
);

TopIconButton.propTypes = {
  edge: PropTypes.oneOf([false, "start", "end"]),
};

export default TopIconButton;
