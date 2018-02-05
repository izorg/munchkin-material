import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { goBack } from 'connected-react-router/lib/actions';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import { withStyles } from 'material-ui/styles';
import NavigationArrowBack from 'material-ui-icons/ArrowBack';
import { noop } from 'lodash';

import DiceIconButton from '../../../../../components/dice/Button';

import Title from '../../../../../components/Title';

const mapDispatchToProps = {
  onBack: goBack,
};

const styles = {
  leftButton: {
    marginLeft: -12,
  },

  rightButton: {
    marginRight: -12,
  },
};

const CombatScreenPageAppBar = ({ classes, onBack }) => (
  <AppBar color="primary" position="static">
    <Toolbar>
      <IconButton
        className={classes.leftButton}
        color="inherit"
        onClick={onBack}
      >
        <NavigationArrowBack />
      </IconButton>

      <Title>
        <FormattedMessage id="combat" defaultMessage="Combat" />
      </Title>

      <DiceIconButton className={classes.rightButton} color="inherit" />
    </Toolbar>
  </AppBar>
);

CombatScreenPageAppBar.propTypes = {
  onBack: PropTypes.func,
};

CombatScreenPageAppBar.defaultProps = {
  onBack: noop,
};

export default compose(
  connect(undefined, mapDispatchToProps),
  withStyles(styles),
)(CombatScreenPageAppBar);
