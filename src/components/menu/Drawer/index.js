import { isWidthDown, withWidth } from '@material-ui/core';
import { goBack, push } from 'connected-react-router';
import { omit } from 'lodash/fp';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createSelector, createStructuredSelector } from 'reselect';

import { MULTI } from '../../../routes/Home/modes';
import { stringifyQuery } from '../../../utils/location';

import openSelector from '../openSelector';

import Component from './Component';

const enable = createSelector(
  openSelector,
  (state, props) => props.match,
  (state, props) => props.location,
  (state, props) => props.width,
  (open, match, location, width) => {
    if (open) {
      return true;
    }

    if (!match.isExact || match.params.mode === MULTI) {
      return false;
    }

    if (location.search) {
      return false;
    }

    return isWidthDown('sm', width);
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
  onOpen: () => push({ search: stringifyQuery({ menu: null }) }),
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
