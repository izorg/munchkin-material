import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { get } from 'lodash/fp';

import { movePlayer } from '../../../../ducks/playerList';

import Component from './Component';

const mapStateToProps = createStructuredSelector({
  playerList: get('playerList'),
});

const mapDispatchToProps = {
  onPlayerMove: movePlayer,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
