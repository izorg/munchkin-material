import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

import AppBar from '../../../components/TopAppBar';
import BackButton from '../../../components/BackButton';
import DiceButton from '../../../components/dice/Button';
import Title from '../../../components/Title';

import KillPlayerButton from './KillPlayerButton';

const styles = (theme) => ({
  leftButton: {
    marginRight: 8,

    [theme.breakpoints.down('sm')]: {
      marginRight: 12,
    },
  },

  title: {
    marginLeft: 12,
  },
});

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
  onBack: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(PlayerAppBar);
