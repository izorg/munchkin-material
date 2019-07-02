import { goBack } from 'connected-react-router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import AppBar from '../../../components/TopAppBar';
import BackButton from '../../../components/BackButton';
import DiceButton from '../../../components/dice/Button';
import Title from '../../../components/Title';

import KillPlayerButton from './KillPlayerButton';

const PlayerAppBar = ({ playerId }) => {
  const dispatch = useDispatch();

  const players = useSelector((state) => state.players);
  const title = players[playerId].name;

  return (
    <AppBar>
      <BackButton
        data-screenshots="player-back-button"
        onClick={() => dispatch(goBack())}
      />

      <Title>{title}</Title>

      <DiceButton data-screenshots="player-dice-button" edge="end" />
      <KillPlayerButton edge="end" playerId={playerId} />
    </AppBar>
  );
};

PlayerAppBar.propTypes = {
  playerId: PropTypes.string.isRequired,
};

export default PlayerAppBar;
