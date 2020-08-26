import {
  Button,
  Fade,
  makeStyles,
  Snackbar,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { FormattedMessage } from 'react-intl';

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

const UndoSnackbar = ({ message, onClose, open }) => {
  const theme = useTheme();
  const classes = useStyles();

  const messageRef = useRef(message);

  if (open) {
    messageRef.current = message;
  }

  const matches = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });

  return (
    <Snackbar
      action={
        <Button color="secondary" onClick={(event) => onClose(event, 'undo')}>
          <FormattedMessage defaultMessage="Undo" id="undo" />
        </Button>
      }
      className={classes.snackbar}
      message={messageRef.current}
      onClose={onClose}
      open={open}
      TransitionComponent={matches ? Fade : undefined}
    />
  );
};

UndoSnackbar.propTypes = {
  message: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

UndoSnackbar.displayName = displayName;

export default UndoSnackbar;
