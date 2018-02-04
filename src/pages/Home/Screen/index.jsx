import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Transition from '../../../components/fab/Transition';

import Page from './Page';
import PlayerAddButton from './PlayerAddButton';

const HomeScreen = ({ match }) => (
  <Fragment>
    <Page />
    <Transition
      appear={false}
      in={Boolean(match) && match.isExact && !match.params.mode}
    >
      <PlayerAddButton />
    </Transition>
  </Fragment>
);

HomeScreen.propTypes = {
  match: PropTypes.object,
};

HomeScreen.defaultProps = {
  match: null,
};

export default HomeScreen;
