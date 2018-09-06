import React from 'react';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core';
import cns from 'classnames';

const styles = (theme) => ({
  root: {
    height: '100%',
    zIndex: theme.zIndex.modal - 1,
  },
});

const ModalScreen = ({ classes, className, ...rest }) => (
  <Modal
    className={cns(classes.root, className)}
    disablePortal
    hideBackdrop
    {...rest}
  />
);

export default withStyles(styles)(ModalScreen);
