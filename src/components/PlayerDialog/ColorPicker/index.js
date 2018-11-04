import { goBack } from 'connected-react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { flow, get, isUndefined, negate } from 'lodash/fp';

import { addQuery, getQuery } from '../../../utils/location';

import Component from './Component';

const mapStateToProps = createStructuredSelector({
  open: flow(
    getQuery,
    get('color'),
    negate(isUndefined),
  ),
});

const mapDispatchToProps = {
  onOpen: () => addQuery({ color: null }),
  onClose: goBack,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
