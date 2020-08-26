import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import UndoSnackbar from '../../../components/UndoSnackbar';
import { updatePlayer } from '../../../ducks/players';
import { applyUndo, removeUndo, UNDO_RESET_PLAYERS } from '../../../ducks/undo';

const displayName = 'HomeUndo';

const HomeUndo = () => {
  const dispatch = useDispatch();

  const open = useSelector((state) => state.undo?.type === UNDO_RESET_PLAYERS);
  const undo = useSelector((state) => state.undo);

  const onClose = (event, reason) => {
    if (!undo) {
      return;
    }

    if (reason === 'undo' && undo) {
      dispatch(applyUndo());

      undo.players.forEach((player) => dispatch(updatePlayer(player)));
    } else {
      dispatch(removeUndo());
    }
  };

  return (
    <UndoSnackbar
      message={
        <FormattedMessage
          defaultMessage="Players have been reset"
          id="undo.resetPlayers"
        />
      }
      onClose={onClose}
      open={open}
    />
  );
};

HomeUndo.displayName = displayName;

export default HomeUndo;
