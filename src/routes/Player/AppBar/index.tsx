import PropTypes from "prop-types";
import type { VFC } from "react";

import BackButton from "../../../components/BackButton";
import DiceButton from "../../../components/dice/Button";
import Title from "../../../components/Title";
import TopAppBar from "../../../components/TopAppBar";
import { useGoBack } from "../../../utils/location";
import usePresentSelector from "../../../utils/usePresentSelector";

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

      <DiceButton data-screenshots="player-dice-button" edge="end" />
      <KillPlayerButton edge="end" playerId={playerId} />
    </TopAppBar>
  );
};

PlayerAppBar.propTypes = {
  playerId: PropTypes.string.isRequired,
};

export default PlayerAppBar;
