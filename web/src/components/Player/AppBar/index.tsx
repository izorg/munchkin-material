import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { type FC } from "react";

import { useGoBack } from "../../../utils/location";
import BackButton from "../../BackButton";
import DiceButton from "../../DiceButton";
import TopAppBar from "../../TopAppBar";

import KillPlayerButton from "./KillPlayerButton";

type PlayerAppBarProps = { playerId: string };

const PlayerAppBar: FC<PlayerAppBarProps> = ({ playerId }) => {
  const goBack = useGoBack();

  return (
    <TopAppBar>
      <BackButton data-screenshots="player-back-button" onClick={goBack} />
      <Box sx={{ flex: 1 }} />
      <DiceButton data-screenshots="player-dice-button" />
      <KillPlayerButton edge="end" playerId={playerId} />
    </TopAppBar>
  );
};

PlayerAppBar.propTypes = {
  playerId: PropTypes.string.isRequired,
};

export default PlayerAppBar;
