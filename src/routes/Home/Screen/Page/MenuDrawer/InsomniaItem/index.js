import { connect } from 'react-redux';
import compose from 'recompose/compose';
import getContext from 'recompose/getContext';
import { goBack } from 'connected-react-router/lib/actions';
import PropTypes from 'prop-types';

import { setKeepAwake } from '../../../../../../ducks/app';

import Component from './Component';

const mapStateToProps = (state) => ({
  keepAwake: state.app.keepAwake,
});

const mapDispatchToProps = {
  onChange: (keepAwake) => (dispatch) => {
    dispatch(setKeepAwake(keepAwake));
    dispatch(goBack());
  },
};

const contextTypes = {
  keepAwakeSupport: PropTypes.bool,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  getContext(contextTypes),
)(Component);
