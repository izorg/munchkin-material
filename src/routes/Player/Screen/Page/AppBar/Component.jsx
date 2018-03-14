import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import NavigationArrowBack from 'material-ui-icons/ArrowBack';
import { noop } from 'lodash';

import AppBar from '../../../../../components/AppBar';
import DiceButton from '../../../../../components/dice/Button';
import Title from '../../../../../components/Title';

const styles = {
  leftButton: {
    marginRight: 8,
  },

  title: {
    marginLeft: 12,
  },
};

const Component = ({ classes, onBack, title }) => (
  <AppBar>
    <IconButton
      className={classes.leftButton}
      color="inherit"
      data-screenshots="player-back-button"
      onClick={onBack}
    >
      <NavigationArrowBack />
    </IconButton>

    <Title className={classes.title}>{title}</Title>

    <DiceButton color="inherit" data-screenshots="player-dice-button" />
  </AppBar>
);

Component.propTypes = {
  onBack: PropTypes.func,
  title: PropTypes.string,
};

Component.defaultProps = {
  onBack: noop,
  title: '',
};

export default withStyles(styles)(Component);
