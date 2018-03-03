import { connect } from 'react-redux';
import compose from 'recompose/compose';
import getContext from 'recompose/getContext';
import { goBack } from 'connected-react-router/lib/actions';
import PropTypes from 'prop-types';

import Component from './Component';

const contextTypes = {
  playerId: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
  edit: Boolean(ownProps.playerId),
});

const mapDispatchToProps = {
  onCancel: goBack,
};

export default compose(
  getContext(contextTypes),
  connect(mapStateToProps, mapDispatchToProps),
)(Component);
