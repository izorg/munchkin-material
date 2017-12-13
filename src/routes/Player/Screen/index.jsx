import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Slide from 'material-ui/transitions/Slide';

import CombatButton from './CombatButton';

import Slider from './Slider';

const PlayerScreen = ({ appear, in: inProp }) => (
  <Fragment>
    <Slide
      appear={appear}
      direction="left"
      in={inProp}
      mountOnEnter
      unmountOnExit
    >
      <Slider />
    </Slide>
    <CombatButton appear={appear} />
  </Fragment>
);

PlayerScreen.propTypes = {
  appear: PropTypes.bool.isRequired,
  in: PropTypes.bool.isRequired,
};

export default PlayerScreen;
