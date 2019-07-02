import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Tooltip } from '@material-ui/core';
import { Skull } from 'mdi-material-ui';
import { useDispatch, useSelector } from 'react-redux';

import TopIconButton from '../../../../components/TopIconButton';
import { killPlayer } from '../../../../ducks/players';
import { setUndo, UNDO_KILL_PLAYER } from '../../../../ducks/undo';

const messages = defineMessages({
  kill: {
    id: 'kill',
    defaultMessage: 'Kill',
  },
});

const onKill = (playerId) => (dispatch, getState) => {
  const player = getState().players[playerId];

  dispatch(killPlayer(playerId));
  dispatch(
    setUndo({
      type: UNDO_KILL_PLAYER,
      player,
    }),
  );
};

const KillPlayerButton = ({ playerId, ...props }) => {
  const dispatch = useDispatch();
  const intl = useIntl();

  const players = useSelector((state) => state.players);
  const disabled = players[playerId].gear === 0;

  return (
    <Tooltip title={intl.formatMessage(messages.kill)}>
      <span>
        <TopIconButton
          disabled={disabled}
          onClick={() => dispatch(onKill(playerId))}
          {...props}
        >
          <Skull />
        </TopIconButton>
      </span>
    </Tooltip>
  );
};

KillPlayerButton.propTypes = {
  playerId: PropTypes.string.isRequired,
};

export default KillPlayerButton;
