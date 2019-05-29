import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { FlagCheckered } from 'mdi-material-ui';
import { noop } from 'lodash/fp';

import AppBar from '../../../components/TopAppBar';
import BackButton from '../../../components/BackButton';
import DiceIconButton from '../../../components/dice/Button';
import Title from '../../../components/Title';
import TopIconButton from '../../../components/TopIconButton';

const CombatAppBar = ({ onBack, onFinish }) => (
  <AppBar>
    <BackButton data-screenshots="combat-back-button" onClick={onBack} />

    <Title>
      <FormattedMessage defaultMessage="Combat" id="combat" />
    </Title>

    <DiceIconButton color="inherit" edge="end" />

    <TopIconButton color="inherit" edge="end" onClick={onFinish}>
      <FlagCheckered />
    </TopIconButton>
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

export default CombatAppBar;
