import { makeStyles } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import UndoSnackbar from '../../../components/UndoSnackbar';
import { updatePlayer } from '../../../ducks/players';
import { applyUndo, removeUndo, UNDO_RESET_PLAYERS } from '../../../ducks/undo';

const displayName = 'HomeUndo';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      bottom: theme.spacing(11),

      [theme.breakpoints.up('sm')]: {
        bottom: theme.spacing(3.5),
      },
    },
  }),
  { name: displayName },
);

const HomeUndo = () => {
  const classes = useStyles();
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
      className={classes.root}
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
