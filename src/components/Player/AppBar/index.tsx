import PropTypes from "prop-types";
import { type VFC } from "react";

import { useGoBack } from "../../../utils/location";
import usePresentSelector from "../../../utils/usePresentSelector";
import BackButton from "../../BackButton";
import DiceButton from "../../dice/Button";
import Title from "../../Title";
import TopAppBar from "../../TopAppBar";

import KillPlayerButton from "./KillPlayerButton";

type PlayerAppBarProps = { playerId: string };

const PlayerAppBar: VFC<PlayerAppBarProps> = ({ playerId }) => {
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
