import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import cn from './style.css';

const FabTransition = props => (
  <CSSTransition
    {...props}
    appear
    classNames={{
      appear: cn.appear,
      appearActive: cn.appearActive,
    }}
    timeout={550}
  />
);

export default FabTransition;
