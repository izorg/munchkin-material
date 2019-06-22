import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Button, Fade, makeStyles, Snackbar } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import clsx from 'clsx';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      '@supports (padding: max(0px))': {
        left: `max(${theme.spacing(1)}px, env(safe-area-inset-right))`,
        right: `max(${theme.spacing(1)}px, env(safe-area-inset-right))`,

        [`${theme.breakpoints.up('sm')}`]: {
          left: `max(${theme.spacing(3)}px, env(safe-area-inset-right))`,
          right: `max(${theme.spacing(3)}px, env(safe-area-inset-right))`,
        },
      },
    },
  }),
  { name: 'UndoSnackbar' },
);

const UndoSnackbar = ({ children, className, message, onClose, ...rest }) => {
  const classes = useStyles();
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
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      className={clsx(classes.root, className)}
      ContentProps={{ className: classes.content }}
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

UndoSnackbar.displayName = 'UndoSnackbar';

export default UndoSnackbar;
