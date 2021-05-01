import { css } from "@emotion/react";
import { Typography, useTheme } from "@material-ui/core";

const Title = (props) => {
  const theme = useTheme();

  return (
    <Typography
      color="inherit"
      css={css`
        flex: 1;
        padding-left: 24px;

        ${theme.breakpoints.up("md")} {
          padding-left: 20px;
        }
      `}
      noWrap
      variant="h6"
      {...props}
    />
  );
};

export default Title;
