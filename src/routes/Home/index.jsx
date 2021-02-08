import { makeStyles, Paper, Zoom } from "@material-ui/core";
import clsx from "clsx";
import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { useMatch } from "react-router-dom";

import LevelLimitDialog from "../../components/levelLimit/Dialog";
import MenuDrawer from "../../components/menu/Drawer";
import MenuSidebar from "../../components/menu/Sidebar";
import Nobody from "../../components/Nobody";
import ScreenModal from "../../components/ScreenModal";
import ThemeDialog from "../../components/theme/Dialog";

import AppBar from "./AppBar";
import PlayerAddButton from "./PlayerAddButton";
import PlayerList from "./PlayerList";
import SinglePlayer from "./SinglePlayer";

const Player = lazy(() =>
  import(
    /* webpackPrefetch: true */
    "../Player"
  )
);

const displayName = "Home";

const useStyles = makeStyles(
  (theme) => ({
    list: {
      backgroundColor:
        theme.palette.mode === "dark"
          ? theme.palette.background.default
          : theme.palette.background.paper,
      flex: 1,
      overflowY: "auto",
      paddingBottom: 56,
      WebkitOverflowScrolling: "touch",

      [theme.breakpoints.up("sm")]: {
        paddingBottom: 64,
      },
    },

    main: {
      display: "flex",
      flex: 1,
      height: "100%",
      overflow: "hidden",
    },

    menu: {
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
    },

    menuCollapsed: {
      padding: theme.spacing(0, 1),
      width: theme.spacing(9),
    },

    root: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },

    single: {
      backgroundColor:
        theme.palette.mode === "dark"
          ? theme.palette.background.default
          : theme.palette.background.paper,
    },
  }),
  { name: displayName }
);

const Home = () => {
  const classes = useStyles();

  const playerList = useSelector((state) => state.present.playerList);
  const playerCount = playerList.length;
  const empty = playerCount === 0;

  let content;

  const singleMode = useSelector((state) => state.present.settings.singleMode);

  if (singleMode) {
    content = <SinglePlayer />;
  } else if (empty) {
    content = <Nobody />;
  } else {
    content = <PlayerList className={classes.list} />;
  }

  const menuCollapsed = useSelector((state) => state.present.ui.menuCollapsed);

  const playerMatch = useMatch({
    end: false,
    path: "/player/:id",
  });

  return (
    <>
      <div className={clsx(classes.root, { [classes.single]: singleMode })}>
        <AppBar empty={empty} singleMode={singleMode} />
        <main className={classes.main}>
          <Paper
            className={clsx(
              classes.menu,
              menuCollapsed && classes.menuCollapsed
            )}
            data-screenshot="sidebar-menu"
            square
          >
            <MenuSidebar />
          </Paper>
          {content}
        </main>
      </div>

      <Zoom appear={false} in={!singleMode}>
        <PlayerAddButton />
      </Zoom>

      <MenuDrawer />
      <LevelLimitDialog />
      <ThemeDialog />

      <ScreenModal open={Boolean(playerMatch)}>
        <Suspense fallback={null}>
          <Player playerId={playerMatch?.params.id} />
        </Suspense>
      </ScreenModal>
    </>
  );
};

Home.displayName = displayName;

export default Home;
