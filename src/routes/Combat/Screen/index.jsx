import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Slide from 'material-ui/transitions/Slide';

import HelperButton from '../HelperButton';
import Combat from '../../../components/Combat';
import DiceDialog from '../../../containers/DiceDialog';

const CombatScreen = ({
  appear, in: inProp, path, ...props
}) => (
  <Fragment>
    <Slide
      appear={appear}
      direction="left"
      in={inProp}
      mountOnEnter
      unmountOnExit
    >
      <Combat {...props} />
    </Slide>
    <HelperButton />
    <DiceDialog path={path} />
  </Fragment>
);

CombatScreen.propTypes = {
  appear: PropTypes.bool.isRequired,
  in: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
};

export default CombatScreen;
