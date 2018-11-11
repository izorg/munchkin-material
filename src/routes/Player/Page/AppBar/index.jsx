import React from 'react';
import { connect } from 'react-redux';
import { goBack } from 'connected-react-router';

import { Consumer } from '../../context';
import Component from './Component';

const mapStateToProps = (state, ownProps) => ({
  title: state.players[ownProps.playerId].name,
});

const mapDispatchToProps = {
  onBack: goBack,
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

export default (props) => (
  <Consumer>
    {(playerId) => <ConnectedComponent playerId={playerId} {...props} />}
  </Consumer>
);
