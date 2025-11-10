import { IconButton, type IconButtonProps } from "@mui/material";

const TopIconButton = (props: IconButtonProps) => {
  const { edge, sx = [], ...rest } = props;

  return (
    <IconButton
      edge={edge}
      sx={[
        {
          padding: "12px",
        },
        edge === "start" && {
          marginLeft: "-12px",
        },
        edge === "end" && {
          marginRight: "-12px",
        },
        ...(sx instanceof Array ? sx : [sx]),
      ]}
      {...rest}
    />
  );
};

export default TopIconButton;
