import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import cn from './style.css';

const FabTransition = props => (
  <CSSTransition
    {...props}
    classNames={{
      enter: cn.enter,
      enterActive: cn.enterActive,
      exit: cn.exit,
      exitActive: cn.exitActive,
    }}
    timeout={{
      enter: 550,
      exit: 150,
    }}
  />
);

export default FabTransition;
