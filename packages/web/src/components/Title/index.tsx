import { Typography, type TypographyProps } from "@mui/material";
import { type FC } from "react";

const Title: FC<TypographyProps> = ({ sx = [], ...props }) => (
  <Typography
    noWrap
    sx={[
      {
        flex: 1,
        paddingX: "4px",
      },
      ...(sx instanceof Array ? sx : [sx]),
    ]}
    variant="h6"
    {...props}
  />
);

export default Title;
