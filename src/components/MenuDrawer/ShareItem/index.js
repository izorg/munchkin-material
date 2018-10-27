import { connect } from 'react-redux';
import branch from 'recompose/branch';
import compose from 'recompose/compose';
import fromRenderProps from 'recompose/fromRenderProps';
import renderNothing from 'recompose/renderNothing';
import { goBack } from 'connected-react-router';
import { pick } from 'lodash/fp';

import { OptionsConsumer } from '../../OptionsContext';

import Component from './Component';

const mapDispatchToProps = {
  onClick: (shareObject) => async (dispatch) => {
    try {
      await navigator.share(shareObject);
      dispatch(goBack());
    } catch (error) {}
  },
};

export default compose(
  fromRenderProps(OptionsConsumer, pick('shareLink')),
  branch(({ shareLink }) => !shareLink || !navigator.share, renderNothing),
  connect(
    undefined,
    mapDispatchToProps,
  ),
)(Component);
