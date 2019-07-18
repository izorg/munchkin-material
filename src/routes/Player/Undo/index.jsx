import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { makeStyles } from '@material-ui/core';
import { flow, get, isEqual } from 'lodash/fp';

import UndoSnackbar from '../../../components/UndoSnackbar';
import { updatePlayer } from '../../../ducks/players';
import { applyUndo, removeUndo, UNDO_KILL_PLAYER } from '../../../ducks/undo';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      bottom: theme.spacing(11),

      [theme.breakpoints.up('sm')]: {
        bottom: theme.spacing(3.5),
      },
    },
  }),
  { name: 'PlayerUndo' },
);

const getUndoType = get(['undo', 'type']);
const getPlayer = get(['undo', 'player']);

const getMessage = createSelector(
  getUndoType,
  getPlayer,
  (type, { name, sex } = {}) => {
    switch (type) {
      case UNDO_KILL_PLAYER:
        return (
          <FormattedMessage
            defaultMessage="{name} {sex,select,female{has died} male{has died}}"
            id="undo.killPlayer"
            values={{
              name,
              sex,
            }}
          />
        );

      default:
        return null;
    }
  },
);

const getOpen = flow(
  getUndoType,
  isEqual(UNDO_KILL_PLAYER),
);

const PlayerUndo = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const message = useSelector(getMessage);
  const open = useSelector(getOpen);
  const player = useSelector(getPlayer);
  const undo = useSelector((state) => state.undo);

  const onClose = (event, reason) => {
    if (!undo) {
      return;
    }

    if (reason === 'undo') {
      dispatch(applyUndo());

      dispatch(updatePlayer(player));
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

export default PlayerUndo;
