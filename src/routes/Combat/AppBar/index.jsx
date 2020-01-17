import { goBack } from 'connected-react-router';
import { FlagCheckered } from 'mdi-material-ui';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';

import BackButton from '../../../components/BackButton';
import DiceIconButton from '../../../components/dice/Button';
import Title from '../../../components/Title';
import AppBar from '../../../components/TopAppBar';
import TopIconButton from '../../../components/TopIconButton';
import { finishCombat } from '../../../ducks/app';

const CombatAppBar = () => {
  const dispatch = useDispatch();

  const onBack = () => dispatch(goBack());

  const onFinish = () => {
    dispatch(finishCombat());
    dispatch(goBack());
  };

  return (
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
};

export default CombatAppBar;
