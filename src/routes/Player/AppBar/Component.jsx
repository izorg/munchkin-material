import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { noop } from 'lodash/fp';

import AppBar from '../../../components/TopAppBar';
import BackButton from '../../../components/BackButton';
import DiceButton from '../../../components/dice/Button';
import Title from '../../../components/Title';

import KillPlayerButton from './KillPlayerButton';

const styles = {
  leftButton: {
    marginRight: 8,
  },

  title: {
    marginLeft: 12,
  },
};

const PlayerAppBar = ({ classes, onBack, title }) => (
  <AppBar>
    <BackButton
      className={classes.leftButton}
      data-screenshots="player-back-button"
      onClick={onBack}
    />

    <Title className={classes.title}>{title}</Title>

    <DiceButton color="inherit" data-screenshots="player-dice-button" />
    <KillPlayerButton color="inherit" />
  </AppBar>
);

PlayerAppBar.propTypes = {
  onBack: PropTypes.func,
  title: PropTypes.string,
};

PlayerAppBar.defaultProps = {
  onBack: noop,
  title: '',
};

export default withStyles(styles)(PlayerAppBar);
