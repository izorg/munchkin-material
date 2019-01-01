import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from '@material-ui/core';
import { SettingsBackupRestore } from '@material-ui/icons';

const messages = defineMessages({
  reset: {
    id: 'player.list.reset',
    defaultMessage: 'Reset',
  },
});

const ResetButton = ({
  intl,
  onPlayerReset,
  onPlayersReset,
  singleMode,
  ...props
}) => (
  <Tooltip title={intl.formatMessage(messages.reset)}>
    <IconButton
      color="inherit"
      onClick={singleMode ? onPlayerReset : onPlayersReset}
      {...props}
    >
      <SettingsBackupRestore />
    </IconButton>
  </Tooltip>
);

ResetButton.propTypes = {
  intl: intlShape.isRequired,
  onPlayerReset: PropTypes.func.isRequired,
  onPlayersReset: PropTypes.func.isRequired,
  singleMode: PropTypes.bool.isRequired,
};

export default injectIntl(ResetButton);
