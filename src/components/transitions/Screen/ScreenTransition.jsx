import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

const ScreenTransition = props => (
  <CSSTransition
    mountOnEnter
    unmountOnExit
    {...props}
  />
);

export default ScreenTransition;
