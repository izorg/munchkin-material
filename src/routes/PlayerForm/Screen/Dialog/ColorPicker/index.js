import { connect } from 'react-redux';
import { goBack, push } from 'connected-react-router';

import { getQuery, stringifyQuery } from '../../../../../utils/location';

import Component from './Component';

const mapStateToprops = (state) => ({
  open: getQuery(state).color !== undefined,
});

const mapDispatchToProps = {
  onOpen: () => push({ search: stringifyQuery({ color: null }) }),
  onClose: goBack,
};

export default connect(
  mapStateToprops,
  mapDispatchToProps,
)(Component);
