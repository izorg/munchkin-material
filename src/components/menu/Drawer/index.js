import { isWidthDown, withWidth } from '@material-ui/core';
import { goBack, push } from 'connected-react-router';
import { omit } from 'lodash/fp';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createSelector, createStructuredSelector } from 'reselect';

import { EDIT } from '../../../routes/Home/modes';
import { getQuery, stringifyQuery } from '../../../utils/location';
import openSelector from '../openSelector';

import Component from './Component';

const enable = createSelector(
  openSelector,
  (state, props) => props.match,
  (state, props) => props.location,
  getQuery,
  (state, props) => props.width,
  (open, match, location, query, width) => {
    if (open) {
      return true;
    }

    if (!isWidthDown('sm', width)) {
      return false;
    }

    return (
      match.isExact && Object.keys(query).every((key) => [EDIT].includes(key))
    );
  },
);

const mapStateToProps = createStructuredSelector({
  enable,
  open: openSelector,
});

const mapDispatchToProps = {
  onClose: () => (dispatch, getState) => {
    if (openSelector(getState())) {
      dispatch(goBack());
    }
  },
  onOpen: () => (dispatch, getState) =>
    dispatch(
      push({
        search: stringifyQuery({
          ...getQuery(getState()),
          menu: null,
        }),
      }),
    ),
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...omit(['history', 'match', 'location', 'staticContext'], ownProps),
  ...stateProps,
  ...dispatchProps,
});

export default withWidth()(
  withRouter(
    connect(mapStateToProps, mapDispatchToProps, mergeProps)(Component),
  ),
);
