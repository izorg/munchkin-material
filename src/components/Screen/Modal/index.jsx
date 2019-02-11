import React from 'react';
import { compose, defaultProps } from 'recompose';
import PropTypes from 'prop-types';
import { Fade, Modal, Slide, withStyles } from '@material-ui/core';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';

import { ios } from '../../../utils/platforms';
import { widthProp } from '../../../utils/propTypes';

import FadeUp from '../Transition';

const SlideLeft = defaultProps({ direction: 'left ' })(Slide);

const Transition = ios ? SlideLeft : FadeUp;

const styles = {
  modal: {
    zIndex: 'auto',
  },

  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    outline: 'none',
  },
};

const ScreenModal = ({ appear, children, classes, open, width, ...rest }) => {
  const ScreenTransition = isWidthDown('md', width) ? Transition : Fade;

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
  width: widthProp.isRequired,
};

ScreenModal.defaultProps = {
  appear: undefined,
  open: false,
};

export default compose(
  withWidth(),
  withStyles(styles),
)(ScreenModal);
