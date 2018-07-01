import { connect } from 'react-redux';
import compose from 'recompose/compose';
import branch from 'recompose/branch';
import getContext from 'recompose/getContext';
import renderNothing from 'recompose/renderNothing';
import { goBack } from 'connected-react-router/lib/actions';
import PropTypes from 'prop-types';

import Component from './Component';

const mapDispatchToProps = {
  onClick: (shareObject) => async (dispatch) => {
    try {
      await navigator.share(shareObject);
      dispatch(goBack());
    } catch (error) {}
  },
};

const contextTypes = {
  shareLink: PropTypes.string,
};

export default compose(
  branch(() => !navigator.share, renderNothing),
  connect(
    undefined,
    mapDispatchToProps,
  ),
  getContext(contextTypes),
)(Component);
