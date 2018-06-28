import { connect } from 'react-redux';
import compose from 'recompose/compose';
import getContext from 'recompose/getContext';
import { goBack } from 'connected-react-router/lib/actions';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

import Component from './Component';

const mapDispatchToProps = {
  onClick: (shareObject) => (dispatch) => {
    navigator
      .share(shareObject)
      .then(() => dispatch(goBack()))
      .catch(noop);
  },
};

const contextTypes = {
  shareLink: PropTypes.string,
};

export default compose(
  connect(
    undefined,
    mapDispatchToProps,
  ),
  getContext(contextTypes),
)(Component);
