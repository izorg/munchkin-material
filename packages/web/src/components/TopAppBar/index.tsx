import { AppBar, Toolbar } from "@mui/material";
import { type FC, type PropsWithChildren } from "react";

const TopAppBar: FC<PropsWithChildren> = ({ children }) => (
  <AppBar
    color="transparent"
    elevation={0}
    position="static"
    sx={[
      {
        zIndex: "appBar",
      },
      {
        "@supports (padding-top: env(safe-area-inset-top))": {
          paddingTop: "env(safe-area-inset-top)",
        },
      },
    ]}
  >
    <Toolbar
      sx={[
        {
          paddingX: 2,
        },
        (theme) => ({
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
