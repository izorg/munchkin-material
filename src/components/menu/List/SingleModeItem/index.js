import { getLocation, goBack } from 'connected-react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { get } from 'lodash/fp';

import { setSingleMode } from '../../../../ducks/app';

import openSelector from '../../openSelector';

import Component from './Component';

const mapStateToProps = createStructuredSelector({
  singleMode: get(['app', 'singleMode']),
});

const onChange = (singleMode) => async (dispatch, getState) => {
  const state = getState();
  const open = openSelector(state);
  const { pathname } = getLocation(state);

  const needBack = open || pathname !== '/';

  if (singleMode) {
    try {
      await dispatch(setSingleMode(singleMode));

      if (needBack) {
        dispatch(goBack());
      }
    } catch (error) {
      // no full version
    }
  } else {
    dispatch(setSingleMode(singleMode));

    if (needBack) {
      dispatch(goBack());
    }
  }
};

const mapDispatchToProps = {
  onChange,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
