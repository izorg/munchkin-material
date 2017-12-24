import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Slide from 'material-ui/transitions/Slide';

import HelperButton from './HelperButton';
import Page from './Page';

const CombatScreen = ({ appear, in: inProp }) => (
  <Fragment>
    <Slide
      appear={appear}
      direction="left"
      in={inProp}
      mountOnEnter
      unmountOnExit
    >
      <Page />
    </Slide>
    <HelperButton appear={appear} />
  </Fragment>
);

CombatScreen.propTypes = {
  appear: PropTypes.bool.isRequired,
  in: PropTypes.bool.isRequired,
};

export default CombatScreen;
