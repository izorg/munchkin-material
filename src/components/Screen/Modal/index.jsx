import React from 'react';
import PropTypes from 'prop-types';
import { Fade, makeStyles, Modal, Slide } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import { ios } from '../../../utils/platforms';

const SlideLeft = (props) => <Slide direction="left" {...props} />;

const useStyles = makeStyles(
  {
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      outline: 'none',
    },
  },
  { name: 'ScreenModal' },
);

const ScreenModal = ({ appear, children, open, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });
  const ScreenTransition = matches && ios ? SlideLeft : Fade;

  return (
    <Modal
      disableEscapeKeyDown
      disablePortal
      hideBackdrop
      open={open}
      {...rest}
    >
      <ScreenTransition appear={appear} in={open}>
        <div className={classes.root}>{children}</div>
      </ScreenTransition>
    </Modal>
  );
};

ScreenModal.propTypes = {
  appear: PropTypes.bool,
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
};

ScreenModal.defaultProps = {
  appear: undefined,
  open: false,
};

export default ScreenModal;
