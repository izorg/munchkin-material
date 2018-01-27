import connect from 'react-redux/es/connect/connect';
import compose from 'recompose/compose';
import getContext from 'recompose/getContext';
import { goBack } from 'connected-react-router/lib/actions';
import PropTypes from 'prop-types';

import Component from './Component';

const contextTypes = {
  playerId: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
  title: state.players[ownProps.playerId].name,
});

const mapDispatchToProps = {
  onBack: goBack,
};

export default compose(
  getContext(contextTypes),
  connect(mapStateToProps, mapDispatchToProps),
)(Component);
