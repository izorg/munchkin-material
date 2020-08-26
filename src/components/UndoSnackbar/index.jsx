import {
  Button,
  Fade,
  Snackbar,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

const displayName = 'UndoSnackbar';

const UndoSnackbar = ({ children, message, onClose, ...rest }) => {
  const theme = useTheme();

  const [state, setState] = useState({ children, message });

  const matches = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });

  useEffect(() => {
    if (children || message) {
      setState({
        children,
        message,
      });
    }
  }, [children, message]);

  return (
    <Snackbar
      action={
        <Button color="secondary" onClick={(event) => onClose(event, 'undo')}>
          <FormattedMessage defaultMessage="Undo" id="undo" />
        </Button>
      }
      onClose={onClose}
      TransitionComponent={matches ? Fade : undefined}
      {...rest}
      {...state}
    />
  );
};

UndoSnackbar.propTypes = {
  children: PropTypes.node,
  message: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

UndoSnackbar.defaultProps = {
  children: undefined,
  message: undefined,
};

UndoSnackbar.displayName = displayName;

export default UndoSnackbar;
