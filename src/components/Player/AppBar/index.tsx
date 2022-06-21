import PropTypes from "prop-types";
import { type FC } from "react";

import usePresentSelector from "../../../hooks/usePresentSelector";
import { useGoBack } from "../../../utils/location";
import BackButton from "../../BackButton";
import DiceButton from "../../DiceButton";
import Title from "../../Title";
import TopAppBar from "../../TopAppBar";

import KillPlayerButton from "./KillPlayerButton";

type PlayerAppBarProps = { playerId: string };

const PlayerAppBar: FC<PlayerAppBarProps> = ({ playerId }) => {
  const goBack = useGoBack();

  const players = usePresentSelector((state) => state.players);
  const title = players[playerId].name;

  return (
    <TopAppBar>
      <BackButton
        data-screenshots="player-back-button"
        onClick={() => goBack()}
      />

      <Title>{title}</Title>

      <DiceButton data-screenshots="player-dice-button" />
      <KillPlayerButton edge="end" playerId={playerId} />
    </TopAppBar>
  );
};

PlayerAppBar.propTypes = {
  playerId: PropTypes.string.isRequired,
};

export default PlayerAppBar;
