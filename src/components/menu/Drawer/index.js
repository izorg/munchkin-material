import { goBack, push } from 'connected-react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { stringifyQuery } from '../../../utils/location';

import openSelector from '../openSelector';

import Component from './Component';

const mapStateToProps = createStructuredSelector({
  open: openSelector,
});

const mapDispatchToProps = {
  onClose: () => (dispatch, getState) => {
    if (openSelector(getState())) {
      dispatch(goBack());
    }
  },
  onOpen: () => push({ search: stringifyQuery({ menu: null }) }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
