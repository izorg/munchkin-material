import React, { cloneElement } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import { classesObject } from '../../../../utils/propTypes';

const DURATION = 150;

const styles = {
  enter: {
    opacity: 0,
    transform: 'scale(0.5) translate3d(0, 50%, 0)',
  },

  enterActive: {
    opacity: 1,
    transform: 'none',
    transitionDuration: `${DURATION}ms`,
    transitionProperty: 'all',
    transitionTimingFunction: 'ease-in',
  },

  exit: {
    opacity: 1,
    transform: 'none',
  },

  exitActive: {
    opacity: 0,
    transform: 'scale(0.8)',
    transitionDuration: `${DURATION}ms`,
    transitionProperty: 'all',
    transitionTimingFunction: 'ease-out',
  },
};

const CombatHelperButtonFade = ({ children, classes, enterDelay, ...props }) => (
  <CSSTransition
    {...props}
    classNames={{
      enter: classes.enter,
      enterActive: classes.enterActive,
      exit: classes.exit,
      exitActive: classes.exitActive,
    }}
    timeout={{
      enter: DURATION + enterDelay,
      exit: DURATION,
    }}
  >
    {state => cloneElement(children, {
      style: {
        transitionDelay: (state === 'entering') ? `${enterDelay}ms` : '0s',
      },
    })}
  </CSSTransition>
);

CombatHelperButtonFade.propTypes = {
  children: PropTypes.node,
  classes: classesObject.isRequired,
  enterDelay: PropTypes.number,
};

CombatHelperButtonFade.defaultProps = {
  children: null,
  enterDelay: 0,
};

export default withStyles(styles)(CombatHelperButtonFade);
