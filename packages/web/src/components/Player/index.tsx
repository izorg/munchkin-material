import { Box } from "@mui/material";
import { Navigate } from "react-router-dom";

import { usePlayerId } from "../../hooks/usePlayerId";
import usePresentSelector from "../../hooks/usePresentSelector";

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
        {playerList.length > 1 && (
          <PlayerList
            sx={[
              {
                display: "none",
                flex: "0 1 auto",
                overflowY: "auto",
                paddingBottom: {
                  sm: 8,
                  xs: 7,
                },
              },
              {
                "@media (min-height: 720px)": {
                  display: "block",
                },
              },
            ]}
          />
        )}
      </Box>
      <CombatButton />
    </>
  );
};

export default Player;
