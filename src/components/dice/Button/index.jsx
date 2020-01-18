import { Tooltip } from '@material-ui/core';
import { push } from 'connected-react-router';
import { DiceMultiple } from 'mdi-material-ui';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

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
  const intl = useIntl();
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(throwDice());
    dispatch(push({ search: stringifyQuery({ dice: null }) }));
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
