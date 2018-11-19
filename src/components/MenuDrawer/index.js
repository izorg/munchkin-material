import { goBack, push } from 'connected-react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { flow, get, isUndefined, negate } from 'lodash/fp';

import { getQuery, stringifyQuery } from '../../utils/location';

import Component from './Component';

const mapStateToProps = createStructuredSelector({
  open: flow(
    getQuery,
    get('menu'),
    negate(isUndefined),
  ),
});

const mapDispatchToProps = {
  onClose: () => (dispatch, getState) => {
    const search = getQuery(getState());

    if (search.menu !== undefined) {
      dispatch(goBack());
    }
  },
  onOpen: () => push({ search: stringifyQuery({ menu: null }) }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
