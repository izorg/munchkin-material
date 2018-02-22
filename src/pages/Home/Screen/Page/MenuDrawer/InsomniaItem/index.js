import { connect } from 'react-redux';
import compose from 'recompose/compose';
import getContext from 'recompose/getContext';
import PropTypes from 'prop-types';

import { setKeepAwake } from '../../../../../../actions';

import Component from './Component';

const mapStateToProps = (state) => ({
  keepAwake: state.app.keepAwake,
});

const mapDispatchToProps = {
  onChange: setKeepAwake,
};

const contextTypes = {
  keepAwakeSupport: PropTypes.bool,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  getContext(contextTypes),
)(Component);
