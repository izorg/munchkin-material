import { AppBar, Toolbar } from "@mui/material";
import PropTypes from "prop-types";
import { type FC, type PropsWithChildren } from "react";

const TopAppBar: FC<PropsWithChildren> = ({ children }) => (
  <AppBar
    position="static"
    sx={{
      zIndex: "appBar",
    }}
  >
    <Toolbar
      sx={(theme) => ({
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),

        "@supports (padding: max(0px))": {
          paddingLeft: `max(${theme.spacing(2)}, env(safe-area-inset-left))`,
          paddingRight: `max(${theme.spacing(2)}, env(safe-area-inset-right))`,
        },

        [theme.breakpoints.up("sm")]: {
          paddingLeft: theme.spacing(3),
          paddingRight: theme.spacing(3),

          "@supports (padding: max(0px))": {
            paddingLeft: `max(${theme.spacing(3)}, env(safe-area-inset-left))`,
            paddingRight: `max(${theme.spacing(
              3
            )}, env(safe-area-inset-right))`,
          },
        },

        [theme.breakpoints.up("md")]: {
          minHeight: "64px",
        },

        "@supports (min-height: env(safe-area-inset-top))": {
          minHeight: "calc(56px + env(safe-area-inset-top))",
          paddingTop: "env(safe-area-inset-top)",

          [theme.breakpoints.up("md")]: {
            minHeight: "calc(64px + env(safe-area-inset-top))",
          },
        },
      })}
    >
      {children}
    </Toolbar>
  </AppBar>
);

TopAppBar.propTypes = {
  children: PropTypes.node,
};

export default TopAppBar;
