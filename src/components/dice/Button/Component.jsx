import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { Tooltip } from '@material-ui/core';
import { DiceMultiple } from 'mdi-material-ui';

import TopIconButton from '../../TopIconButton';

const messages = defineMessages({
  dice: {
    id: 'dice',
    defaultMessage: 'Dice',
  },
});

const DiceIconButton = ({ intl, ...props }) => (
  <Tooltip title={intl.formatMessage(messages.dice)}>
    <TopIconButton {...props}>
      <DiceMultiple />
    </TopIconButton>
  </Tooltip>
);

DiceIconButton.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(DiceIconButton);
