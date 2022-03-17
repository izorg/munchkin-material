import { Box, Paper, useTheme, Zoom } from "@mui/material";
import { lazy, Suspense } from "react";
import { useMatch } from "react-router-dom";

import LevelLimitDialog from "../../components/levelLimit/Dialog";
import MenuDrawer from "../../components/menu/Drawer";
import MenuSidebar from "../../components/menu/Sidebar";
import Nobody from "../../components/Nobody";
import ScreenDialog from "../../components/ScreenDialog";
import ThemeDialog from "../../components/theme/Dialog";
import useEditMode from "../../utils/useEditMode";
import usePresentSelector from "../../utils/usePresentSelector";

import AppBar from "./AppBar";
import PlayerAddButton from "./PlayerAddButton";
import PlayerList from "./PlayerList";
import SinglePlayer from "./SinglePlayer";

const Player = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "../Player"
    )
);

const Home = () => {
  const theme = useTheme();

  const playerList = usePresentSelector((state) => state.playerList);
  const playerCount = playerList.length;
  const empty = playerCount === 0;

  let content;

  const singleMode = usePresentSelector((state) => state.settings.singleMode);
  const { editMode } = useEditMode();

  if (singleMode) {
    content = <SinglePlayer />;
  } else if (empty) {
    content = <Nobody />;
  } else {
    content = (
      <Box
        sx={[
          {
            flex: 1,
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
          },
          editMode &&
            "cordova" in window &&
            window.cordova.platformId === "windows" && {
              touchAction: "none",
            },
        ]}
      >
        <PlayerList
          sx={{
            paddingBottom: {
              sm: "64px",
              xs: "56px",
            },
          }}
        />
      </Box>
    );
  }

  const menuCollapsed = usePresentSelector((state) => state.ui.menuCollapsed);

  const playerMatch = useMatch({
    end: false,
    path: "/player/:id",
  });

  return (
    <>
      <Box
        sx={(theme) => ({
          backgroundColor: theme.palette.background.default,
          display: "flex",
          flexDirection: "column",
          height: "100%;",
        })}
      >
        <AppBar empty={empty} singleMode={singleMode} />
        <Box
          component="main"
          sx={{
            display: "flex",
            flex: 1,
            height: "100%",
            overflow: "hidden",
          }}
        >
          <Paper
            data-screenshot="sidebar-menu"
            square
            sx={[
              (theme) => ({
                display: "none",
                overflowX: "hidden",
                padding: 0,
                transition: theme.transitions.create(["padding", "width"], {
                  duration: theme.transitions.duration.short,
                }),
                width: theme.spacing(40),
                zIndex: 1,

                [theme.breakpoints.up("md")]: {
                  display: "block",
                },
              }),
              menuCollapsed && {
                padding: theme.spacing(0, 1),
                width: theme.spacing(9),
              },
            ]}
          >
            <MenuSidebar />
          </Paper>
          {content}
        </Box>
      </Box>

      <Zoom appear={false} in={!singleMode}>
        <PlayerAddButton />
      </Zoom>

      <MenuDrawer />
      <LevelLimitDialog />
      <ThemeDialog />

      <ScreenDialog open={Boolean(playerMatch)}>
        <Suspense fallback={null}>
          <Player playerId={playerMatch?.params.id} />
        </Suspense>
      </ScreenDialog>
    </>
  );
};

export default Home;
