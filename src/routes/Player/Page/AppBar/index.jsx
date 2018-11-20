import { goBack } from 'connected-react-router';
import { connect } from 'react-redux';

import Component from './Component';

const mapStateToProps = (state, ownProps) => ({
  title: state.players[ownProps.playerId].name,
});

const mapDispatchToProps = {
  onBack: goBack,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
