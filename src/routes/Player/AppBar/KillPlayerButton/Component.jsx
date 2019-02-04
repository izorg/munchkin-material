import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import { Tooltip } from '@material-ui/core';
import { Skull } from 'mdi-material-ui';

import TopIconButton from '../../../../components/TopIconButton';

const messages = defineMessages({
  kill: {
    id: 'kill',
    defaultMessage: 'Kill',
  },
});

const KillPlayerButton = ({ intl, onClick, playerId, ...props }) => (
  <Tooltip title={intl.formatMessage(messages.kill)}>
    <span>
      <TopIconButton onClick={() => onClick(playerId)} {...props}>
        <Skull />
      </TopIconButton>
    </span>
  </Tooltip>
);

KillPlayerButton.propTypes = {
  intl: intlShape.isRequired,
  onClick: PropTypes.func.isRequired,
  playerId: PropTypes.string.isRequired,
};

export default injectIntl(KillPlayerButton);
