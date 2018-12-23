import { push } from 'connected-react-router';
import { connect } from 'react-redux';

import { stringifyQuery } from '../../../../../utils/location';

import Component from './Component';

const mapDispatchToProps = {
  onClick: () => push({ search: stringifyQuery({ menu: null }) }),
};

export default connect(
  undefined,
  mapDispatchToProps,
)(Component);
