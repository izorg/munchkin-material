import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { lazy, Suspense, useRef } from "react";
import { Navigate, useMatch } from "react-router-dom";

import PlayerContext from "../../components/PlayerContext";
import ScreenDialog from "../../components/ScreenDialog";
import usePresentSelector from "../../utils/usePresentSelector";

import AppBar from "./AppBar";
import CombatButton from "./CombatButton";
import PlayerList from "./List";
import Slider from "./Slider";

const Combat = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "../Combat"
    )
);

type PlayerProps = {
  playerId?: null | string;
};

const Player = ({ playerId }: PlayerProps) => {
  const playerRef = useRef<string>();
  const playerList = usePresentSelector((state) => state.playerList);

  const combatMatch = useMatch({
    end: false,
    path: "/player/:id/combat",
  });

  if (playerId && !playerList.includes(playerId)) {
    return <Navigate to="/" />;
  }

  if (playerId) {
    playerRef.current = playerId;
  }

  if (!playerRef.current) {
    return <Navigate to="/" />;
  }

  return (
    <PlayerContext.Provider value={playerRef.current}>
      <Box
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flex: 1,
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <AppBar playerId={playerRef.current} />
        <Box
          sx={(theme) => ({
            display: "flex",
            flex: 1,
            flexDirection: "column",
            overflowY: "auto",

            [theme.breakpoints.up("md")]: {
              flexDirection: "row-reverse",
            },
          })}
        >
          <Box
            sx={(theme) => ({
              display: "flex",
              flex: "1 0 auto",

              [theme.breakpoints.up("md")]: {
                flexShrink: 1,
                overflow: "hidden",
              },
            })}
          >
            <Slider playerId={playerRef.current} />
          </Box>
          {playerList.length > 1 && (
            <PlayerList
              selectedPlayerId={playerRef.current}
              sx={(theme) => ({
                display: "none",
                flex: "0 1 auto",
                overflowY: "auto",
                paddingBottom: theme.spacing(7),

                // eslint-disable-next-line sort-keys
                "@media (min-height: 720px)": {
                  display: "block",
                },

                [theme.breakpoints.up("sm")]: {
                  paddingBottom: theme.spacing(8),
                },

                [theme.breakpoints.up("md")]: {
                  display: "block",
                  flex: "none",
                  paddingBottom: theme.spacing(1),
                  width: theme.spacing(50),
                },
              })}
            />
          )}
        </Box>
      </Box>
      <CombatButton playerId={playerRef.current} />

      <ScreenDialog open={Boolean(combatMatch)}>
        <Suspense fallback={null}>
          <Combat />
        </Suspense>
      </ScreenDialog>
    </PlayerContext.Provider>
  );
};

Player.propTypes = {
  playerId: PropTypes.string,
};

Player.defaultProps = {
  playerId: null,
};

export default Player;
