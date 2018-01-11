import React from 'react';
import PropTypes from 'prop-types';
import Slide from 'material-ui/transitions/Slide';

import Component from './Component';

const PlayerFormScreen = ({ appear, match }) => (
  <Slide
    appear={appear}
    direction="up"
    in={Boolean(match)}
    mountOnEnter
    unmountOnExit
  >
    <Component />
  </Slide>
);

PlayerFormScreen.propTypes = {
  appear: PropTypes.bool.isRequired,
  match: PropTypes.object,
};

PlayerFormScreen.defaultProps = {
  match: null,
};

export default PlayerFormScreen;
