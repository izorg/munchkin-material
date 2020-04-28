import { goBack } from 'connected-react-router';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BackButton from '../../../components/BackButton';
import DiceButton from '../../../components/dice/Button';
import Title from '../../../components/Title';
import TopAppBar from '../../../components/TopAppBar';

import KillPlayerButton from './KillPlayerButton';

const displayName = 'PlayerAppBar';

const PlayerAppBar = ({ playerId }) => {
  const dispatch = useDispatch();

  const players = useSelector((state) => state.players);
  const title = players[playerId].name;

  return (
    <TopAppBar>
      <BackButton
        data-screenshots="player-back-button"
        onClick={() => dispatch(goBack())}
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
