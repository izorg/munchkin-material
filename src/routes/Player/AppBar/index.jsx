import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

import BackButton from '../../../components/BackButton';
import DiceButton from '../../../components/dice/Button';
import Title from '../../../components/Title';
import TopAppBar from '../../../components/TopAppBar';
import { useGoBack } from '../../../utils/location';

import KillPlayerButton from './KillPlayerButton';

const displayName = 'PlayerAppBar';

const PlayerAppBar = ({ playerId }) => {
  const goBack = useGoBack();

  const players = useSelector((state) => state.present.players);
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

PlayerAppBar.displayName = displayName;

export default PlayerAppBar;
