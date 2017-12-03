import React from 'react';
import connect from 'react-redux/es/connect/connect';
import Transition from 'react-transition-group/Transition';
import PropTypes from 'prop-types';
import { withTheme } from 'material-ui/styles';

import { movePlayer } from '../../../actions';
import { themeObject } from '../../../utils/propTypes';

import { activateMultiSelect } from '../actions';

import Component from './Component';

const mapStateToProps = state => ({
  playerList: state.playerList,
});

const mapDispatchToProps = {
  onMultiSelectActivate: activateMultiSelect,
  onPlayerMove: movePlayer,
};

const ConnectedScreen = connect(mapStateToProps, mapDispatchToProps)(Component);

const ScreenTransition = ({ in: inProp, theme }) => (
  <Transition
    in={inProp}
    timeout={{
      exit: theme.transitions.duration.leavingScreen,
    }}
    unmountOnExit
  >
    <ConnectedScreen />
  </Transition>
);

ScreenTransition.propTypes = {
  in: PropTypes.bool.isRequired,
  theme: themeObject.isRequired, // eslint-disable-line react/no-typos
};

export default withTheme()(ScreenTransition);
