import { FlagCheckered } from 'mdi-material-ui';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import BackButton from '../../../components/BackButton';
import DiceIconButton from '../../../components/dice/Button';
import Title from '../../../components/Title';
import TopAppBar from '../../../components/TopAppBar';
import TopIconButton from '../../../components/TopIconButton';
import { finishCombat } from '../../../ducks/app';

const displayName = 'CombatAppBar';

const CombatAppBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onBack = () => history.goBack();

  const onFinish = () => {
    dispatch(finishCombat());
    history.goBack();
  };

  return (
    <TopAppBar>
      <BackButton data-screenshots="combat-back-button" onClick={onBack} />

      <Title>
        <FormattedMessage defaultMessage="Combat" id="combat" />
      </Title>

      <DiceIconButton color="inherit" edge="end" />

      <TopIconButton color="inherit" edge="end" onClick={onFinish}>
        <FlagCheckered />
      </TopIconButton>
    </TopAppBar>
  );
};

CombatAppBar.displayName = displayName;

export default CombatAppBar;
