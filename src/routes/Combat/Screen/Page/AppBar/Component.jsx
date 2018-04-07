import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import NavigationArrowBack from '@material-ui/icons/ArrowBack';
import { noop } from 'lodash';

import AppBar from '../../../../../components/AppBar';
import DiceIconButton from '../../../../../components/dice/Button';
import FlagCheckered from '../../../../../components/icons/FlagCheckered';
import Title from '../../../../../components/Title';

const styles = {
  leftButton: {
    marginRight: 8,
  },

  title: {
    marginLeft: 12,
  },
};

const CombatScreenPageAppBarComponent = ({ classes, onBack, onFinish }) => (
  <AppBar>
    <IconButton
      className={classes.leftButton}
      color="inherit"
      data-screenshots="combat-back-button"
      onClick={onBack}
    >
      <NavigationArrowBack />
    </IconButton>

    <Title className={classes.title}>
      <FormattedMessage id="combat" defaultMessage="Combat" />
    </Title>

    <DiceIconButton color="inherit" />

    <IconButton color="inherit" onClick={onFinish}>
      <FlagCheckered />
    </IconButton>
  </AppBar>
);

CombatScreenPageAppBarComponent.propTypes = {
  onBack: PropTypes.func,
  onFinish: PropTypes.func,
};

CombatScreenPageAppBarComponent.defaultProps = {
  onBack: noop,
  onFinish: noop,
};

export default withStyles(styles)(CombatScreenPageAppBarComponent);
