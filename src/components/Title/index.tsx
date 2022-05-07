import { Typography, type TypographyProps } from "@mui/material";
import { type FC } from "react";

const Title: FC<TypographyProps> = ({ sx = [], ...props }) => (
  <Typography
    noWrap
    sx={[
      {
        flex: 1,
        paddingLeft: {
          md: "20px",
          xs: "24px",
        },
      },
      ...(Array.isArray(sx) ? sx : [sx]), // eslint-disable-line @typescript-eslint/no-unsafe-assignment
    ]}
    variant="h6"
    {...props}
  />
);

export default Title;
