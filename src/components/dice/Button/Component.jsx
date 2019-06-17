import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Tooltip } from '@material-ui/core';
import { DiceMultiple } from 'mdi-material-ui';

import TopIconButton from '../../TopIconButton';

const messages = defineMessages({
  dice: {
    id: 'dice',
    defaultMessage: 'Dice',
  },
});

const DiceIconButton = (props) => {
  const intl = useIntl();

  return (
    <Tooltip title={intl.formatMessage(messages.dice)}>
      <TopIconButton {...props}>
        <DiceMultiple />
      </TopIconButton>
    </Tooltip>
  );
};

export default DiceIconButton;
