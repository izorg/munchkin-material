import { Box, Zoom } from "@mui/material";

import usePresentSelector from "../../hooks/usePresentSelector";
import LevelLimitDialog from "../LevelLimitDialog";
import Nobody from "../Nobody";
import ThemeDialog from "../ThemeDialog";
import ThemeSchemeDialog from "../ThemeSchemeDialog";

import AppBar from "./AppBar";
import PlayerAddButton from "./PlayerAddButton";
import PlayerList from "./PlayerList";
import SinglePlayer from "./SinglePlayer";

const Home = () => {
  const playerList = usePresentSelector((state) => state.playerList);
  const playerCount = playerList.length;
  const empty = playerCount === 0;

  let content;

  const singleMode = usePresentSelector((state) => state.settings.singleMode);

  if (singleMode) {
    content = <SinglePlayer />;
  } else if (empty) {
    content = <Nobody sx={{ flex: 1 }} />;
  } else {
    content = (
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
        }}
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

  return (
    <>
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
        {content}
      </Box>

      <Zoom appear={false} in={!singleMode}>
        <PlayerAddButton />
      </Zoom>

      <LevelLimitDialog />
      <ThemeDialog />
      <ThemeSchemeDialog />
    </>
  );
};

export default Home;
