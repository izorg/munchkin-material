import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/es/IconButton';
import Tooltip from 'material-ui/es/Tooltip';

import DiceMultipleIcon from '../icons/dice/multiple';

const DiceIconButton = ({ disableTriggerFocus, ...props }) => (
  <Tooltip
    disableTriggerFocus={disableTriggerFocus}
    title={<FormattedMessage id="dice" defaultMessage="Dice" />}
  >
    <IconButton {...props}>
      <DiceMultipleIcon />
    </IconButton>
  </Tooltip>
);

DiceIconButton.propTypes = {
  disableTriggerFocus: PropTypes.bool,
};

DiceIconButton.defaultProps = {
  disableTriggerFocus: false,
};

export default DiceIconButton;
