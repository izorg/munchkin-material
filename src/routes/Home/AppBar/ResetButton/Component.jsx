import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Tooltip } from '@material-ui/core';
import { BackupRestore } from 'mdi-material-ui';

import TopIconButton from '../../../../components/TopIconButton';

const messages = defineMessages({
  reset: {
    id: 'player.list.reset',
    defaultMessage: 'Reset',
  },
});

const ResetButton = ({
  onPlayerReset,
  onPlayersReset,
  singleMode,
  ...props
}) => {
  const intl = useIntl();

  return (
    <Tooltip title={intl.formatMessage(messages.reset)}>
      <TopIconButton
        color="inherit"
        onClick={singleMode ? onPlayerReset : onPlayersReset}
        {...props}
      >
        <BackupRestore />
      </TopIconButton>
    </Tooltip>
  );
};

ResetButton.propTypes = {
  onPlayerReset: PropTypes.func.isRequired,
  onPlayersReset: PropTypes.func.isRequired,
  singleMode: PropTypes.bool.isRequired,
};

export default ResetButton;
