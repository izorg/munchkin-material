import React from 'react';
import PropTypes from 'prop-types';
import Slide from 'material-ui/transitions/Slide';

import CombatButton from '../../Combat/Button';
import Slider from '../../../components/Player/Slider';

const PlayerScreen = ({ appear, in: inProp, ...props }) => [
  <Slide
    appear={appear}
    direction="left"
    in={inProp}
    key="screen"
    mountOnEnter
    unmountOnExit
  >
    <Slider {...props} />
  </Slide>,
  <CombatButton key="fab" />,
];

PlayerScreen.propTypes = {
  appear: PropTypes.bool.isRequired,
  in: PropTypes.bool.isRequired,
};

export default PlayerScreen;
