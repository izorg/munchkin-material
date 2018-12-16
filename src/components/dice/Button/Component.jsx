import React from 'react';
import { FormattedMessage } from 'react-intl';
import { IconButton, Tooltip } from '@material-ui/core';
import { DiceMultiple } from 'mdi-material-ui';

const DiceIconButton = (props) => (
  <Tooltip title={<FormattedMessage id="dice" defaultMessage="Dice" />}>
    <IconButton {...props}>
      <DiceMultiple />
    </IconButton>
  </Tooltip>
);

export default DiceIconButton;
