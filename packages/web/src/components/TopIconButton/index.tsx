import { IconButton, type IconButtonProps } from "@mui/material";
import { forwardRef } from "react";

const TopIconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function TopIconButton(props, ref) {
    return (
      <IconButton
        ref={ref}
        sx={[
          {
            padding: "12px",
          },
          props.edge === "start" && {
            marginLeft: "-12px",
          },
          props.edge === "end" && {
            marginRight: "-12px",
          },
        ]}
        {...props}
      />
    );
  },
);

export default TopIconButton;
