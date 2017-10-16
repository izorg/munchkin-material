import React, { cloneElement } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import transitions, { duration, easing } from 'material-ui/styles/transitions';

import { classesObject } from '../../../../utils/propTypes';

const styles = {
  enter: {
    opacity: 0,
    transform: 'scale(0.5) translateY(20px)',
  },

  enterActive: {
    opacity: 1,
    transform: 'scale(1) translateY(0)',
    transition: transitions.create(['opacity', 'transform'], {
      duration: duration.shortest,
      easing: easing.easeIn,
    }),
  },

  exit: {
    opacity: 1,
    transform: 'scale(1)',
  },

  exitActive: {
    opacity: 0,
    transform: 'scale(0.8)',
    transition: transitions.create(['opacity', 'transform'], {
      duration: duration.shortest,
      easing: easing.easeOut,
    }),
  },
};

const CombatHelperButtonFade = ({
  children, classes, enterDelay, ...props
}) => (
  <CSSTransition
    {...props}
    classNames={{
      enter: classes.enter,
      enterActive: classes.enterActive,
      exit: classes.exit,
      exitActive: classes.exitActive,
    }}
    timeout={{
      enter: duration.shortest + enterDelay,
      exit: duration.shortest,
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
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
  enterDelay: PropTypes.number,
};

CombatHelperButtonFade.defaultProps = {
  children: null,
  enterDelay: 0,
};

export default withStyles(styles)(CombatHelperButtonFade);
