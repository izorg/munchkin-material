import { Box } from "@mui/material";
import { Navigate } from "react-router-dom";

import usePresentSelector from "../../hooks/usePresentSelector";
import { usePlayerId } from "../PlayerView";

import AppBar from "./AppBar";
import CombatButton from "./CombatButton";
import PlayerList from "./List";
import Slider from "./Slider";

const Player = () => {
  const playerId = usePlayerId();

  const playerList = usePresentSelector((state) => state.playerList);

  if (playerId && !playerList.includes(playerId)) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <AppBar />
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: {
            xs: "column",
            md: "row-reverse",
          },
          overflowY: "auto",
        }}
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
            playerId={playerId}
            sx={{
              width: "100%",
            }}
          />
        </Box>
        {playerList.length > 1 && (
          <PlayerList
            sx={(theme) => ({
              display: "none",
              flex: "0 1 auto",
              overflowY: "auto",
              paddingBottom: theme.spacing(7),

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
      <CombatButton />
    </>
  );
};

export default Player;
