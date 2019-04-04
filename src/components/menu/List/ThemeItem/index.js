import { push, replace } from 'connected-react-router';
import { connect } from 'react-redux';

import { stringifyQuery } from '../../../../utils/location';
import openSelector from '../../openSelector';

import Component from './Component';

const mapDispatchToProps = {
  onClick: () => (dispatch, getState) => {
    const location = { search: stringifyQuery({ theme: null }) };

    const open = openSelector(getState());

    if (open) {
      dispatch(replace(location));
    } else {
      dispatch(push(location));
    }
  },
};

export default connect(
  undefined,
  mapDispatchToProps,
)(Component);
