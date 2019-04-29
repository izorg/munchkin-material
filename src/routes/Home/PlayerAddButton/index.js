import { push } from 'connected-react-router';
import { connect } from 'react-redux';

import Component from './Component';

const mapDispatchToProps = {
  onClick: () => push('?player'),
};

export default connect(
  undefined,
  mapDispatchToProps,
  undefined,
  { forwardRef: true },
)(Component);
