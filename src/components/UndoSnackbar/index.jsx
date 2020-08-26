import {
  Button,
  Fade,
  Snackbar,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { FormattedMessage } from 'react-intl';

const displayName = 'UndoSnackbar';

const UndoSnackbar = ({ className, message, onClose, open }) => {
  const theme = useTheme();

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
      className={className}
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
