import { Tooltip } from '@material-ui/core';
import { BackupRestore } from 'mdi-material-ui';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import TopIconButton from '../../../../components/TopIconButton';
import {
  setCombatHelperBonus,
  setCombatPlayerBonus,
} from '../../../../ducks/combat';
import { updatePlayer } from '../../../../ducks/players';
import { setUndo, UNDO_RESET_PLAYERS } from '../../../../ducks/undo';

const displayName = 'ResetButton';

const messages = defineMessages({
  reset: {
    id: 'player.list.reset',
    defaultMessage: 'Reset',
  },
});

const onReset = () => (dispatch, getState) => {
  const {
    combat,
    playerList,
    players,
    settings: { singleMode },
  } = getState();

  if (singleMode) {
    const { playerId: id } = combat;

    dispatch(
      updatePlayer({
        gear: 0,
        id,
        level: 1,
      }),
    );
    dispatch(setCombatPlayerBonus(0));
  } else {
    const undo = [];

    playerList.forEach((id) => {
      const player = players[id];

      if (player.level !== 1 || player.gear !== 0) {
        undo.push(player);

        dispatch(
          updatePlayer({
            gear: 0,
            id,
            level: 1,
          }),
        );
      }
    });

    dispatch(setCombatPlayerBonus(0));
    dispatch(setCombatHelperBonus(0));

    if (undo.length) {
      dispatch(
        setUndo({
          type: UNDO_RESET_PLAYERS,
          players: undo,
        }),
      );
    }
  }
};

const ResetButton = (props) => {
  const dispatch = useDispatch();
  const intl = useIntl();

  const disabled = useSelector((state) => {
    const {
      combat: { playerBonus, playerId },
      playerList,
      players,
      settings: { singleMode },
    } = state;

    if (singleMode) {
      const player = players[playerId];

      return player.level === 1 && player.gear === 0 && playerBonus === 0;
    }

    return playerList.every((id) => {
      const player = players[id];

      return player.level === 1 && player.gear === 0;
    });
  });

  const button = (
    <TopIconButton
      color="inherit"
      disabled={disabled}
      onClick={() => dispatch(onReset())}
      {...props}
    >
      <BackupRestore />
    </TopIconButton>
  );

  if (disabled) {
    return button;
  }

  return <Tooltip title={intl.formatMessage(messages.reset)}>{button}</Tooltip>;
};

ResetButton.displayName = displayName;

export default ResetButton;
