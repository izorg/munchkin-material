import React from 'react';
import PropTypes from 'prop-types';
import Slide from 'material-ui/transitions/Slide';

import Component from './Component';

const PlayerFormScreen = ({ appear, in: inProp }) => (
  <Slide
    appear={appear}
    direction="up"
    in={inProp}
    mountOnEnter
    unmountOnExit
  >
    <Component />
  </Slide>
);

PlayerFormScreen.propTypes = {
  appear: PropTypes.bool.isRequired,
  in: PropTypes.bool.isRequired,
};

export default PlayerFormScreen;
