import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { get } from 'lodash/fp';

import { applyUpdate } from '../../../../../../ducks/update';

import Component from './Component';

const mapStateToProps = createStructuredSelector({
  update: get('update'),
  version: get(['versions', 'app']),
});

const mapDispatchToProps = {
  onClick: () => (dispatch, getState) => {
    if (get('update', getState())) {
      dispatch(applyUpdate());
    }
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
