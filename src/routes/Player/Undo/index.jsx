import { makeStyles } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import UndoSnackbar from '../../../components/UndoSnackbar';
import { updatePlayer } from '../../../ducks/players';
import { applyUndo, removeUndo, UNDO_KILL_PLAYER } from '../../../ducks/undo';

const displayName = 'PlayerUndo';

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

const PlayerUndo = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const open = useSelector((state) => state.undo?.type === UNDO_KILL_PLAYER);
  const player = useSelector((state) => state.undo?.player);
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
      message={
        player && (
          <FormattedMessage
            defaultMessage="{name} {sex,select,female{has died} male{has died}}"
            id="undo.killPlayer"
            values={{
              name: player.name,
              sex: player.sex,
            }}
          />
        )
      }
      onClose={onClose}
      open={open}
    />
  );
};

PlayerUndo.displayName = displayName;

export default PlayerUndo;
