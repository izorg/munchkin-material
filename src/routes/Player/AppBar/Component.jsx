import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '../../../components/TopAppBar';
import BackButton from '../../../components/BackButton';
import DiceButton from '../../../components/dice/Button';
import Title from '../../../components/Title';

import KillPlayerButton from './KillPlayerButton';

const PlayerAppBar = ({ onBack, title }) => (
  <AppBar>
    <BackButton data-screenshots="player-back-button" onClick={onBack} />

    <Title>{title}</Title>

    <DiceButton
      color="inherit"
      data-screenshots="player-dice-button"
      edge="end"
    />
    <KillPlayerButton color="inherit" edge="end" />
  </AppBar>
);

PlayerAppBar.propTypes = {
  onBack: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default PlayerAppBar;
