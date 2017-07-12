import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import cn from './style.css';

const PageFade = props => (
  <CSSTransition
    {...props}
    classNames={{
      enter: cn.itemEnter,
      enterActive: cn.itemEnterActive,
      exit: cn.itemLeave,
      exitActive: cn.itemLeaveActive,
    }}
    timeout={400}
  />
);

export default PageFade;
