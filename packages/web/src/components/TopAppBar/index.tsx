import { AppBar, Toolbar } from "@mui/material";
import PropTypes from "prop-types";
import { type FC, type PropsWithChildren } from "react";

const TopAppBar: FC<PropsWithChildren> = ({ children }) => (
  <AppBar
    color="transparent"
    elevation={0}
    position="static"
    sx={(theme) => ({
      backgroundColor: theme.palette.background.default,
      zIndex: "appBar",
    })}
  >
    <Toolbar
      sx={[
        {
          minHeight: {
            md: "64px",
          },
          paddingX: {
            sm: 3,
            xs: 2,
          },
        },
        (theme) => ({
          "@supports (min-height: env(safe-area-inset-top))": {
            minHeight: {
              md: "calc(64px + env(safe-area-inset-top))",
              xs: "calc(56px + env(safe-area-inset-top))",
            },
            paddingTop: "env(safe-area-inset-top)",
          },
          "@supports (padding: max(0px))": {
            paddingLeft: {
              sm: `max(${theme.spacing(3)}, env(safe-area-inset-left))`,
              xs: `max(${theme.spacing(2)}, env(safe-area-inset-left))`,
            },
            paddingRight: {
              sm: `max(${theme.spacing(3)}, env(safe-area-inset-right))`,
              xs: `max(${theme.spacing(2)}, env(safe-area-inset-right))`,
            },
          },
        }),
      ]}
    >
      {children}
    </Toolbar>
  </AppBar>
);

TopAppBar.propTypes = {
  children: PropTypes.node,
};

export default TopAppBar;
