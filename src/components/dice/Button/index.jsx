import { Tooltip } from '@material-ui/core';
import { DiceMultiple } from 'mdi-material-ui';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { throwDice } from '../../../ducks/dice';
import { stringifyQuery } from '../../../utils/location';
import TopIconButton from '../../TopIconButton';

const displayName = 'DiceIconButton';

const messages = defineMessages({
  dice: {
    id: 'dice',
    defaultMessage: 'Dice',
  },
});

const DiceIconButton = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const intl = useIntl();

  const onClick = () => {
    dispatch(throwDice());
    history.push({ search: stringifyQuery({ dice: null }) });
  };

  return (
    <Tooltip title={intl.formatMessage(messages.dice)}>
      <TopIconButton {...props} onClick={onClick}>
        <DiceMultiple />
      </TopIconButton>
    </Tooltip>
  );
};

DiceIconButton.displayName = displayName;

export default DiceIconButton;
