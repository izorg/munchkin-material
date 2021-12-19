import { css } from "@emotion/react";
import { Typography, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import { type FC } from "react";

const Title: FC = ({ children }) => {
  const theme = useTheme();

  return (
    <Typography
      css={css`
        flex: 1;
        padding-left: 24px;

        ${theme.breakpoints.up("md")} {
          padding-left: 20px;
        }
      `}
      noWrap
      variant="h6"
    >
      {children}
    </Typography>
  );
};

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;
