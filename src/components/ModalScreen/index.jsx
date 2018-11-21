import React from 'react';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import cns from 'classnames';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
};

const ModalScreen = ({ classes, className, ...rest }) => (
  <Modal
    className={cns(classes.root, className)}
    disablePortal
    hideBackdrop
    open
    {...rest}
  />
);

export default withStyles(styles)(ModalScreen);
