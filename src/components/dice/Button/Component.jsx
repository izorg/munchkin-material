import React from 'react';
import { FormattedMessage } from 'react-intl';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DiceMultipleIcon from 'mdi-material-ui/DiceMultiple';

const DiceIconButton = (props) => (
  <Tooltip title={<FormattedMessage id="dice" defaultMessage="Dice" />}>
    <IconButton {...props}>
      <DiceMultipleIcon />
    </IconButton>
  </Tooltip>
);

export default DiceIconButton;
