import React, { Fragment } from 'react';
import connect from 'react-redux/es/connect/connect';
import matchPath from 'react-router-dom/es/matchPath';
import PropTypes from 'prop-types';

import Transition from '../../../components/fab/Transition';

import NewPlayerButton from './NewPlayerButton';
import Page from './Page';

const mapStateToProps = ({ router: { location: { pathname } } }) => ({
  in: Boolean(matchPath(pathname, { path: '/', exact: true })),
});

const HomeScreen = ({ in: inProp }) => (
  <Fragment>
    <Page />
    <Transition in={inProp}>
      <NewPlayerButton />
    </Transition>
  </Fragment>
);

HomeScreen.propTypes = {
  in: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(HomeScreen);
