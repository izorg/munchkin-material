import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Slide from 'material-ui/transitions/Slide';

import Transition from '../../../../components/fab/Transition';

import HelperButton from './HelperButton/index';
import Page from './Page';

const CombatScreen = ({ appear, match }) => (
  <Fragment>
    <Slide
      appear={appear}
      direction="left"
      in={Boolean(match)}
      mountOnEnter
      unmountOnExit
    >
      <Page />
    </Slide>
    <Transition
      appear={appear}
      in={Boolean(match)}
    >
      <HelperButton />
    </Transition>
  </Fragment>
);

CombatScreen.propTypes = {
  appear: PropTypes.bool.isRequired,
  match: PropTypes.object,
};

CombatScreen.defaultProps = {
  match: null,
};

export default CombatScreen;
