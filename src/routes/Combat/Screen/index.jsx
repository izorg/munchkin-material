import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Slide from 'material-ui/transitions/Slide';

import HelperButton from '../HelperButton';
import Combat from '../../../components/Combat';

const CombatScreen = ({
  appear, in: inProp, ...props
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
    <HelperButton appear={appear} />
  </Fragment>
);

CombatScreen.propTypes = {
  appear: PropTypes.bool.isRequired,
  in: PropTypes.bool.isRequired,
};

export default CombatScreen;
