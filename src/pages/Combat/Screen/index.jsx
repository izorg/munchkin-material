import React, { Fragment } from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';
import Slide from 'material-ui/transitions/Slide';

import Transition from '../../../components/fab/Transition';

import HelperButton from './HelperButton';
import HelperSelector from './Page/HelperSelector';
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
    <Transition appear={appear} in={Boolean(match)}>
      <HelperButton />
    </Transition>
    <HelperSelector />
  </Fragment>
);

CombatScreen.propTypes = {
  appear: PropTypes.bool.isRequired,
  match: PropTypes.object,
};

CombatScreen.defaultProps = {
  match: null,
};

export default hot(module)(CombatScreen);
