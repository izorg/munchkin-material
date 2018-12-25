import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { IconButton, withStyles } from '@material-ui/core';
import { FlagCheckered } from 'mdi-material-ui';
import { noop } from 'lodash/fp';

import AppBar from '../../../components/AppBar';
import BackButton from '../../../components/BackButton';
import DiceIconButton from '../../../components/dice/Button';
import Title from '../../../components/Title';

const styles = {
  leftButton: {
    marginRight: 8,
  },

  title: {
    marginLeft: 12,
  },
};

const CombatAppBar = ({ classes, onBack, onFinish }) => (
  <AppBar>
    <BackButton
      className={classes.leftButton}
      data-screenshots="combat-back-button"
      onClick={onBack}
    />

    <Title className={classes.title}>
      <FormattedMessage id="combat" defaultMessage="Combat" />
    </Title>

    <DiceIconButton color="inherit" />

    <IconButton color="inherit" onClick={onFinish}>
      <FlagCheckered />
    </IconButton>
  </AppBar>
);

CombatAppBar.propTypes = {
  onBack: PropTypes.func,
  onFinish: PropTypes.func,
};

CombatAppBar.defaultProps = {
  onBack: noop,
  onFinish: noop,
};

export default withStyles(styles)(CombatAppBar);
