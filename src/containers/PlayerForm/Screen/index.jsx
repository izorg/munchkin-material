import React from 'react';
import PropTypes from 'prop-types';
import Slide from 'material-ui/es/transitions/Slide';

import Form from '../../../components/Player/Form';

const PlayerFormScreen = ({ appear, in: inProp, ...props }) => (
  <Slide
    appear={appear}
    direction="up"
    in={inProp}
    mountOnEnter
    unmountOnExit
  >
    <Form {...props} />
  </Slide>
);

PlayerFormScreen.propTypes = {
  appear: PropTypes.bool.isRequired,
  in: PropTypes.bool.isRequired,
};

export default PlayerFormScreen;
