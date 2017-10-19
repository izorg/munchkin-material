import React from 'react';
import { FormattedMessage } from 'react-intl';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';

import DiceMultipleIcon from '../icons/dice/multiple';

const DiceIconButton = props => (
  <Tooltip title={<FormattedMessage id="dice" defaultMessage="Dice" />}>
    <IconButton {...props}>
      <DiceMultipleIcon />
    </IconButton>
  </Tooltip>
);

export default DiceIconButton;
