import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Slide from 'material-ui/transitions/Slide';

import CombatButton from './CombatButton';
import DiceDialog from '../../../containers/DiceDialog';

import Slider from './Slider';

const PlayerScreen = ({
  appear, in: inProp, path,
}) => (
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
    <CombatButton />
    <DiceDialog path={path} />
  </Fragment>
);

PlayerScreen.propTypes = {
  appear: PropTypes.bool.isRequired,
  in: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
};

export default PlayerScreen;
