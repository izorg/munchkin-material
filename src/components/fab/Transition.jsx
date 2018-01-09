import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Zoom from 'material-ui/transitions/Zoom';

import { classesObject, themeObject } from '../../utils/propTypes';

const styles = theme => ({
  container: {
    bottom: theme.spacing.unit * 2,
    position: 'fixed',
    right: theme.spacing.unit * 2,
    zIndex: 2,
  },
});

const Transition = ({
  classes, children, theme, ...props
}) => (
  <Zoom
    enterDelay={theme.transitions.duration.leavingScreen}
    mountOnEnter
    unmountOnExit
    {...props}
  >
    <div className={classes.container}>
      {children}
    </div>
  </Zoom>
);

Transition.propTypes = {
  children: PropTypes.node,
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
  theme: themeObject.isRequired, // eslint-disable-line react/no-typos
};

Transition.defaultProps = {
  children: null,
};

export default withStyles(styles, { withTheme: true })(Transition);
