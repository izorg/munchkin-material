import { Box } from "@mui/material";
import { Navigate } from "react-router";

import { usePlayerId } from "../../hooks/usePlayerId";
import usePresentSelector from "../../hooks/usePresentSelector";

import AppBar from "./AppBar";
import CombatButton from "./CombatButton";
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
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        <Slider
          playerId={playerId}
          sx={{
            display: "flex",
            flex: "1 0 auto",
          }}
        />
      </Box>
      <CombatButton />
    </>
  );
};

export default Player;
