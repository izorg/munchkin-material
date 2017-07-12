import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import cn from './style.css';

const DiceTransition = props => (
  <CSSTransition
    {...props}
    classNames={{
      enter: cn.enter,
      enterActive: cn.enterActive,
      exit: cn.leave,
      exitActive: cn.leaveActive,
    }}
    timeout={{
      enter: 300,
      exit: 150,
    }}
  />
);

export default DiceTransition;
