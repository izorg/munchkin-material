import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Transition from '../../../components/fab/Transition';

import Page from './Page';
import PlayerAddButton from './PlayerAddButton';

const HomeScreen = ({ in: inProp }) => (
  <Fragment>
    <Page />
    <Transition appear={false} in={inProp}>
      <PlayerAddButton />
    </Transition>
  </Fragment>
);

HomeScreen.propTypes = {
  in: PropTypes.bool,
};

HomeScreen.defaultProps = {
  in: false,
};

const mapStateToProps = (state, ownProps) => {
  const {
    app: { singleMode },
  } = state;
  const { match } = ownProps;

  return {
    in: Boolean(match) && match.isExact && !match.params.mode && !singleMode,
  };
};

export default connect(mapStateToProps)(HomeScreen);
