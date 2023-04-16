import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { useRef } from "react";
import { Navigate, useMatch } from "react-router-dom";

import usePresentSelector from "../../hooks/usePresentSelector";
import Combat from "../Combat";
import PlayerContext from "../PlayerContext";
import ScreenDialog from "../ScreenDialog";

import AppBar from "./AppBar";
import CombatButton from "./CombatButton";
import PlayerList from "./List";
import Slider from "./Slider";

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
          <Slider
            playerId={playerRef.current}
            sx={{
              width: "100%",
            }}
          />
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
                width: "400px",
              },
            })}
          />
        )}
      </Box>
      <CombatButton playerId={playerRef.current} />

      <ScreenDialog open={Boolean(combatMatch)}>
        <Combat />
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
