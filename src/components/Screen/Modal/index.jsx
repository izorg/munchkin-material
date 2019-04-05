import React from 'react';
import PropTypes from 'prop-types';
import { Fade, makeStyles, Modal, Slide } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import { ios } from '../../../utils/platforms';

import FadeUp from '../Transition';

const SlideLeft = (props) => <Slide direction="left" {...props} />;

const Transition = ios ? SlideLeft : FadeUp;

const useStyles = makeStyles(
  {
    modal: {
      zIndex: 'auto',
    },

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

  const matches = useMediaQuery(theme.breakpoints.up('lg'), { noSsr: true });
  const ScreenTransition = matches ? Fade : Transition;

  return (
    <Modal
      classes={{
        root: classes.root,
      }}
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
