import React from 'react';
import { makeStyles, Modal } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(
  {
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  { name: 'ModalScreen' },
);

const ModalScreen = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Modal
      className={clsx(classes.root, className)}
      disablePortal
      hideBackdrop
      open
      {...rest}
    />
  );
};

export default ModalScreen;
