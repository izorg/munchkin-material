import { AppBar, Toolbar } from "@mui/material";
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
          paddingX: 2,
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
            paddingLeft: `max(${theme.spacing(2)}, env(safe-area-inset-left))`,
            paddingRight: `max(${theme.spacing(2)}, env(safe-area-inset-right))`,
          },
        }),
      ]}
    >
      {children}
    </Toolbar>
  </AppBar>
);

export default TopAppBar;
