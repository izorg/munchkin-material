import {
  Fade,
  makeStyles,
  Modal,
  Slide,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

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

let timeout = 0;

const ScreenModal = ({ children, open }) => {
  const classes = useStyles();
  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });
  const TransitionComponent = matches && ios ? Slide : Fade;

  useEffect(() => {
    timeout = undefined;
  }, []);

  return (
    <Modal closeAfterTransition disablePortal hideBackdrop open={open}>
      <TransitionComponent
        appear
        direction={matches && ios ? 'left' : undefined}
        in={open}
        timeout={timeout}
      >
        <div className={classes.root}>{children}</div>
      </TransitionComponent>
    </Modal>
  );
};

ScreenModal.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
};

ScreenModal.displayName = displayName;

export default ScreenModal;
