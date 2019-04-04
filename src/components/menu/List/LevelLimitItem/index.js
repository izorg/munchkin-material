import { push, replace } from 'connected-react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { get } from 'lodash/fp';

import { stringifyQuery } from '../../../../utils/location';
import openSelector from '../../openSelector';

import Component from './Component';

const mapStateToProps = createStructuredSelector({
  epic: get(['app', 'epic']),
  levelLimit: get(['app', 'levelLimit']),
});

const mapDispatchToProps = {
  onClick: () => (dispatch, getState) => {
    const location = { search: stringifyQuery({ levelLimit: null }) };

    const open = openSelector(getState());

    if (open) {
      dispatch(replace(location));
    } else {
      dispatch(push(location));
    }
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
