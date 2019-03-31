import { goBack, push } from 'connected-react-router';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { flow, get, isNull } from 'lodash/fp';

import { getQuery, stringifyQuery } from '../../../utils/location';

import Component from './Component';

const open = createSelector(
  getQuery,
  flow(
    get('menu'),
    isNull,
  ),
);

const mapStateToProps = createStructuredSelector({
  open,
});

const mapDispatchToProps = {
  onClose: () => (dispatch, getState) => {
    if (open(getState())) {
      dispatch(goBack());
    }
  },
  onOpen: () => push({ search: stringifyQuery({ menu: null }) }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
