import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import Zoom from '@material-ui/core/Zoom';
import { withTheme } from '@material-ui/core/styles';

import Page from './Page';
import PlayerAddButton from './PlayerAddButton';

const HomeScreen = ({ in: inProp, theme }) => (
  <Fragment>
    <Page />
    <Zoom
      appear={false}
      in={inProp}
      style={{
        transitionDelay: inProp ? theme.transitions.duration.leavingScreen : 0,
      }}
    >
      <PlayerAddButton />
    </Zoom>
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

export default compose(
  connect(mapStateToProps),
  withTheme(),
)(HomeScreen);
