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
            md: "row-reverse",
            xs: "column",
          },
          overflowY: "auto",
        }}
      >
        <Box
          data-test="lol"
          sx={{
            display: "flex",
            flex: "1 0 auto",
            flexShrink: {
              md: 1,
            },
            overflow: {
              md: "hidden",
            },
          }}
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
            sx={[
              {
                display: "none",
                flex: "0 1 auto",
                overflowY: "auto",
                paddingBottom: {
                  md: 1,
                  sm: 8,
                  xs: 7,
                },
              },
              {
                "@media (min-height: 720px)": {
                  display: "block",
                },
              },
              (theme) => ({
                [theme.breakpoints.up("md")]: {
                  display: "block",
                  flex: "none",
                  width: "400px",
                },
              }),
            ]}
          />
        )}
      </Box>
      <CombatButton />
    </>
  );
};

export default Player;
