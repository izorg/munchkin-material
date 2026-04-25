import { Box } from "@mui/material";
import { type FC } from "react";

import { useGoBack } from "../../../utils/location";
import BackButton from "../../BackButton";
import DiceButton from "../../DiceButton";
import TopAppBar from "../../TopAppBar";
import { PlayerMenuIconButton } from "../PlayerMenuIconButton";

import KillPlayerButton from "./KillPlayerButton";

const PlayerAppBar: FC = () => {
  const goBack = useGoBack();

  return (
    <TopAppBar>
      <BackButton data-screenshots="player-back-button" onClick={goBack} />
      <Box sx={{ flex: 1 }} />
      <DiceButton data-screenshots="player-dice-button" />
      <KillPlayerButton />
      <PlayerMenuIconButton edge="end" />
    </TopAppBar>
  );
};

export default PlayerAppBar;
