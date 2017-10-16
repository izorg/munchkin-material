import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import { classesObject } from '../../utils/propTypes';

const styles = {
  item: {
    backgroundColor: '#FFFFFF',
    height: '100%',
    left: 0,
    position: 'absolute',
    width: '100%',
    top: 0,
    zIndex: 0,
  },
};

const AppScreenTransition = ({ children, classes, ...props }) => (
  <CSSTransition
    {...props}
    mountOnEnter
    unmountOnExit
  >
    <div className={classes.item}>
      {children}
    </div>
  </CSSTransition>
);

AppScreenTransition.propTypes = {
  children: PropTypes.node.isRequired,
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
};

export default withStyles(styles)(AppScreenTransition);
