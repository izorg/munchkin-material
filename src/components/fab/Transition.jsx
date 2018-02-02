import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Zoom from 'material-ui/transitions/Zoom';

const styles = (theme) => ({
  container: {
    bottom: theme.spacing.unit * 2,
    position: 'fixed',
    right: theme.spacing.unit * 2,
    zIndex: 2,
  },
});

const Transition = ({ classes, children, theme, ...props }) => (
  <Zoom
    enterDelay={theme.transitions.duration.leavingScreen}
    mountOnEnter
    unmountOnExit
    {...props}
  >
    <div className={classes.container}>{children}</div>
  </Zoom>
);

Transition.propTypes = {
  children: PropTypes.node,
};

Transition.defaultProps = {
  children: null,
};

export default withStyles(styles, { withTheme: true })(Transition);
