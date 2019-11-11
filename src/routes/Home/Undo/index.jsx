import { flow, get, isEqual } from 'lodash/fp';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { createSelector } from 'reselect';

import UndoSnackbar from '../../../components/UndoSnackbar';
import { updatePlayer } from '../../../ducks/players';
import { applyUndo, removeUndo, UNDO_RESET_PLAYERS } from '../../../ducks/undo';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      bottom: theme.spacing(11),

      [theme.breakpoints.up('sm')]: {
        bottom: theme.spacing(3.5),
      },
    },
  }),
  { name: 'HomeUndo' },
);

const getUndoType = get(['undo', 'type']);
const getPlayers = get(['undo', 'players']);

const getMessage = createSelector(getUndoType, (type) => {
  switch (type) {
    case UNDO_RESET_PLAYERS:
      return (
        <FormattedMessage
          defaultMessage="Players have been reset"
          id="undo.resetPlayers"
        />
      );

    default:
      return null;
  }
});

const getOpen = flow(getUndoType, isEqual(UNDO_RESET_PLAYERS));

const HomeUndo = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const message = useSelector(getMessage);
  const open = useSelector(getOpen);
  const undo = useSelector((state) => state.undo);
  const players = useSelector(getPlayers);

  const onClose = (event, reason) => {
    if (!undo) {
      return;
    }

    if (reason === 'undo' && undo) {
      dispatch(applyUndo());

      players.forEach((player) => dispatch(updatePlayer(player)));
    } else {
      dispatch(removeUndo());
    }
  };

  return (
    <UndoSnackbar
      className={classes.root}
      message={message}
      onClose={onClose}
      open={open}
    />
  );
};

export default HomeUndo;
