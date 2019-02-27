import { goBack } from 'connected-react-router';
import { connect } from 'react-redux';
import { branch, compose, fromRenderProps, renderNothing } from 'recompose';
import { pick } from 'lodash/fp';

import OptionsContext from '../../../OptionsContext';

import Component from './Component';

const mapDispatchToProps = {
  onClick: (shareObject) => async (dispatch) => {
    try {
      await navigator.share(shareObject);
      dispatch(goBack());
    } catch (error) {
      // cancel share
    }
  },
};

export default compose(
  fromRenderProps(OptionsContext.Consumer, pick('shareLink')),
  branch(({ shareLink }) => !shareLink || !navigator.share, renderNothing),
  connect(
    undefined,
    mapDispatchToProps,
  ),
)(Component);
