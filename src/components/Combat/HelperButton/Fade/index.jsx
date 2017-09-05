import React, { cloneElement } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import PropTypes from 'prop-types';

import cn from './style.css';

const CombatHelperButtonFade = ({ children, enterDelay, ...props }) => (
  <CSSTransition
    {...props}
    classNames={{
      enter: cn.enter,
      enterActive: cn.enterActive,
      exit: cn.exit,
      exitActive: cn.exitActive,
    }}
    timeout={{
      enter: 150 + enterDelay,
      exit: 150,
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
  enterDelay: PropTypes.number,
};

CombatHelperButtonFade.defaultProps = {
  children: null,
  enterDelay: 0,
};

export default CombatHelperButtonFade;
