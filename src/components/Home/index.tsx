import { Box, Zoom } from "@mui/material";
import { useMatch } from "react-router-dom";

import useEditMode from "../../utils/useEditMode";
import usePresentSelector from "../../utils/usePresentSelector";
import LevelLimitDialog from "../levelLimit/Dialog";
import Nobody from "../Nobody";
import Player from "../Player";
import ScreenDialog from "../ScreenDialog";
import ThemeDialog from "../theme/Dialog";

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

  const playerMatch = useMatch({
    end: false,
    path: "/player/:id",
  });

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

      <ScreenDialog open={Boolean(playerMatch)}>
        <Player playerId={playerMatch?.params.id} />
      </ScreenDialog>
    </>
  );
};

export default Home;
