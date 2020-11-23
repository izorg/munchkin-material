import {
  Button,
  Fade,
  makeStyles,
  Snackbar,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { ActionCreators } from 'redux-undo';

import { useUndo } from '../UndoProvider';

const displayName = 'UndoSnackbar';

const useStyles = makeStyles(
  (theme) => ({
    snackbar: {
      bottom: theme.spacing(11),

      [theme.breakpoints.up('sm')]: {
        bottom: theme.spacing(3.5),
      },
    },
  }),
  { name: displayName },
);

const UndoSnackbar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const classes = useStyles();

  const mdDown = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

  const open = useSelector((state) => state.past.length > 0);

  const onClose = (event, reason) => {
    if (reason === 'undo') {
      dispatch(ActionCreators.undo());
    }

    dispatch(ActionCreators.clearHistory());
  };

  const { message, setMessage } = useUndo();

  useEffect(() => {
    if (open && !message) {
      console.warn('No message for undo snackbar');
    }
  }, [message, open]);

  return (
    <Snackbar
      action={
        <Button color="secondary" onClick={(event) => onClose(event, 'undo')}>
          <FormattedMessage defaultMessage="Undo" id="undo" />
        </Button>
      }
      autoHideDuration={8000}
      className={classes.snackbar}
      message={message}
      onClose={onClose}
      open={open}
      TransitionComponent={mdDown ? Fade : undefined}
      TransitionProps={{
        onExited: () => setMessage(null),
      }}
    />
  );
};

UndoSnackbar.displayName = displayName;

export default UndoSnackbar;
