import React, { Fragment } from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';
import Slide from 'material-ui/transitions/Slide';

import Transition from '../../../components/fab/Transition';

import CombatButton from './CombatButton';
import Page from './Page';

const PlayerScreen = ({ appear, match }) => (
  <Fragment key="PlayerScreen">
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
      in={Boolean(match) && match.isExact}
    >
      <CombatButton appear={appear} />
    </Transition>
  </Fragment>
);

PlayerScreen.propTypes = {
  appear: PropTypes.bool.isRequired,
  match: PropTypes.object,
};

PlayerScreen.defaultProps = {
  match: null,
};

export default hot(module)(PlayerScreen);
