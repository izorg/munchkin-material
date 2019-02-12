import React from 'react';
import { Modal, withStyles } from '@material-ui/core';
import clsx from 'clsx';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
};

const ModalScreen = ({ classes, className, ...rest }) => (
  <Modal
    className={clsx(classes.root, className)}
    disablePortal
    hideBackdrop
    open
    {...rest}
  />
);

export default withStyles(styles)(ModalScreen);
