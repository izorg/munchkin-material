import React from 'react';
import PropTypes from 'prop-types';
import Slide from 'material-ui/es/transitions/Slide';

import CombatButton from '../../Combat/Button';
import DiceDialog from '../../../containers/DiceDialog';
import Slider from '../../../components/Player/Slider';

const PlayerScreen = ({
  appear, in: inProp, path, ...props
}) => [
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
  <DiceDialog key="dice-dialog" path={path} />,
];

PlayerScreen.propTypes = {
  appear: PropTypes.bool.isRequired,
  in: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
};

export default PlayerScreen;
