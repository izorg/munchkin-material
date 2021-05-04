import { css } from "@emotion/react";
import { Paper, useTheme, Zoom } from "@material-ui/core";
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

const Home = () => {
  const theme = useTheme();

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
    content = (
      <PlayerList
        css={css`
          flex: 1;
          -webkit-overflow-scrolling: touch;
          overflow-y: auto;
          padding-bottom: 56px;

          ${theme.breakpoints.up("sm")} {
            padding-bottom: 64px;
          }
        `}
      />
    );
  }

  const menuCollapsed = useSelector((state) => state.present.ui.menuCollapsed);

  const playerMatch = useMatch({
    end: false,
    path: "/player/:id",
  });

  return (
    <>
      <div
        css={css`
          background-color: ${theme.palette.background.default};
          display: flex;
          flex-direction: column;
          height: 100%;
        `}
      >
        <AppBar empty={empty} singleMode={singleMode} />
        <main
          css={css`
            display: flex;
            flex: 1;
            height: 100%;
            overflow: hidden;
          `}
        >
          <Paper
            css={[
              css`
                display: none;
                overflow-x: hidden;
                padding: 0;
                transition: ${theme.transitions.create(["padding", "width"], {
                  duration: theme.transitions.duration.short,
                })};
                width: ${theme.spacing(40)};
                z-index: 1;

                ${theme.breakpoints.up("md")} {
                  display: block;
                }
              `,
              menuCollapsed &&
                css`
                  padding: ${theme.spacing(0, 1)};
                  width: ${theme.spacing(9)};
                `,
            ]}
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
