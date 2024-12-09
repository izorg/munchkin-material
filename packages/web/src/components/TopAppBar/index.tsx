import { AppBar, Toolbar } from "@mui/material";
import { type FC, type PropsWithChildren } from "react";

const TopAppBar: FC<PropsWithChildren> = ({ children }) => (
  <AppBar
    color="inherit"
    elevation={0}
    position="static"
    sx={{
      backgroundColor: "background.default",
      paddingTop: "var(--inset-top)",
      zIndex: "appBar",
    }}
  >
    <Toolbar
      disableGutters
      sx={(theme) => ({
        paddingLeft: `calc(${theme.spacing(2)} + var(--inset-left)) /*! @noflip */`,
        paddingRight: `calc(${theme.spacing(2)} + var(--inset-right)) /*! @noflip */`,
      })}
    >
      {children}
    </Toolbar>
  </AppBar>
);

export default TopAppBar;
