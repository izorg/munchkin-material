import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { goBack } from 'connected-react-router/lib/actions';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui-icons/ArrowBack';
import { noop } from 'lodash';

import { finishCombat } from '../../../../../actions';

import AppBar from '../../../../../components/AppBar';
import DiceIconButton from '../../../../../components/dice/Button';
import FlagCheckered from '../../../../../components/icons/FlagCheckered';
import Title from '../../../../../components/Title';

const mapDispatchToProps = {
  onBack: goBack,
  onFinish: () => (dispatch) => {
    dispatch(finishCombat());
    dispatch(goBack());
  },
};

const CombatScreenPageAppBar = ({ onBack, onFinish }) => (
  <AppBar color="primary" position="static">
    <IconButton color="inherit" onClick={onBack}>
      <NavigationArrowBack />
    </IconButton>

    <Title>
      <FormattedMessage id="combat" defaultMessage="Combat" />
    </Title>

    <DiceIconButton color="inherit" />

    <IconButton color="inherit" onClick={onFinish}>
      <FlagCheckered />
    </IconButton>
  </AppBar>
);

CombatScreenPageAppBar.propTypes = {
  onBack: PropTypes.func,
  onFinish: PropTypes.func,
};

CombatScreenPageAppBar.defaultProps = {
  onBack: noop,
  onFinish: noop,
};

export default connect(undefined, mapDispatchToProps)(CombatScreenPageAppBar);
