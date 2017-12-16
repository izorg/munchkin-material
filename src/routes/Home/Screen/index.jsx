import React, { Fragment } from 'react';
import connect from 'react-redux/es/connect/connect';

import { movePlayer } from '../../../actions';

import { activateMultiSelect } from '../actions';

import Component from './Component';
import NewPlayerButton from './NewPlayerButton';

const mapStateToProps = state => ({
  playerList: state.playerList,
});

const mapDispatchToProps = {
  onMultiSelectActivate: activateMultiSelect,
  onPlayerMove: movePlayer,
};

const ConnectedScreen = connect(mapStateToProps, mapDispatchToProps)(Component);

const ScreenTransition = () => (
  <Fragment>
    <ConnectedScreen />
    <NewPlayerButton />
  </Fragment>
);

export default ScreenTransition;
