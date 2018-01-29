import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Transition from '../../../components/fab/Transition';

import NewPlayerButton from './PlayerAddButton';
import Page from './Page/index';

const HomeScreen = ({ match }) => (
  <Fragment>
    <Page />
    <Transition
      appear={false}
      in={Boolean(match) && match.isExact && !match.params.mode}
    >
      <NewPlayerButton />
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
