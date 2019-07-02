import React from 'react';
import { push } from 'connected-react-router';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Tooltip } from '@material-ui/core';
import { DiceMultiple } from 'mdi-material-ui';

import { throwDice } from '../../../ducks/dice';
import { stringifyQuery } from '../../../utils/location';

import TopIconButton from '../../TopIconButton';

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

export default DiceIconButton;
