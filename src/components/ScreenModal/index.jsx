import {
  Fade,
  makeStyles,
  Modal,
  Slide,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

import { ios } from '../../utils/platforms';

const displayName = 'ScreenModal';

const useStyles = makeStyles(
  {
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      outline: 'none',
    },
  },
  { name: displayName },
);

const ScreenModal = ({ children, open, TransitionProps }) => {
  const classes = useStyles();
  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });
  const TransitionComponent = matches && ios ? Slide : Fade;

  return (
    <Modal closeAfterTransition hideBackdrop open={open}>
      <TransitionComponent
        appear
        direction={matches && ios ? 'left' : undefined}
        in={open}
        {...TransitionProps}
      >
        <div className={classes.root}>{children}</div>
      </TransitionComponent>
    </Modal>
  );
};

ScreenModal.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  TransitionProps: PropTypes.object,
};

ScreenModal.displayName = displayName;

export default ScreenModal;
