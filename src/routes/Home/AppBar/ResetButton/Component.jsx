import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
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
  intl,
  onPlayerReset,
  onPlayersReset,
  singleMode,
  ...props
}) => (
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

ResetButton.propTypes = {
  intl: intlShape.isRequired,
  onPlayerReset: PropTypes.func.isRequired,
  onPlayersReset: PropTypes.func.isRequired,
  singleMode: PropTypes.bool.isRequired,
};

export default injectIntl(ResetButton);
