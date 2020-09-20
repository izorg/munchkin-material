import { Tooltip } from '@material-ui/core';
import { Skull } from 'mdi-material-ui';
import PropTypes from 'prop-types';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import TopIconButton from '../../../../components/TopIconButton';
import { useUndoMessage } from '../../../../components/UndoProvider';
import { killPlayer } from '../../../../ducks/players';

const displayName = 'KillPlayerButton';

const messages = defineMessages({
  kill: {
    id: 'kill',
    defaultMessage: 'Kill',
  },

  undo: {
    id: 'undo.killPlayer',
    defaultMessage: '{name} {sex,select,female{has died} male{has died}}',
  },
});

const KillPlayerButton = ({ playerId, ...props }) => {
  const dispatch = useDispatch();
  const intl = useIntl();

  const [, setMessage] = useUndoMessage();

  const players = useSelector((state) => state.present.players);
  const disabled = players[playerId].gear === 0;

  const onClick = () => {
    const player = players[playerId];

    setMessage(
      intl.formatMessage(messages.undo, {
        name: player.name,
        sex: player.sex,
      }),
    );
    dispatch(killPlayer(playerId));
  };

  const button = (
    <TopIconButton disabled={disabled} onClick={onClick} {...props}>
      <Skull />
    </TopIconButton>
  );

  if (disabled) {
    return button;
  }

  return <Tooltip title={intl.formatMessage(messages.kill)}>{button}</Tooltip>;
};

KillPlayerButton.propTypes = {
  playerId: PropTypes.string.isRequired,
};

KillPlayerButton.displayName = displayName;

export default KillPlayerButton;
