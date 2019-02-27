import { goBack } from 'connected-react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { get } from 'lodash/fp';

import { setSingleMode } from '../../../../ducks/app';

import Component from './Component';

const mapStateToProps = createStructuredSelector({
  singleMode: get(['app', 'singleMode']),
});

const onChange = (singleMode) => async (dispatch) => {
  if (singleMode) {
    try {
      await dispatch(setSingleMode(singleMode));
      dispatch(goBack());
    } catch (error) {
      // no full version
    }
  } else {
    dispatch(setSingleMode(singleMode));
    dispatch(goBack());
  }
};

const mapDispatchToProps = {
  onChange,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
