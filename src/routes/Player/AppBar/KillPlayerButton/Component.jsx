import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from '@material-ui/core';
import { Skull } from 'mdi-material-ui';

import PlayerContext from '../../../../components/PlayerContext';

const messages = defineMessages({
  kill: {
    id: 'kill',
    defaultMessage: 'Kill',
  },
});

const KillPlayerButton = ({ intl, onClick, ...props }) => (
  <PlayerContext.Consumer>
    {(playerId) => (
      <Tooltip title={intl.formatMessage(messages.kill)}>
        <IconButton onClick={() => onClick(playerId)} {...props}>
          <Skull />
        </IconButton>
      </Tooltip>
    )}
  </PlayerContext.Consumer>
);

KillPlayerButton.propTypes = {
  intl: intlShape.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default injectIntl(KillPlayerButton);
