import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import Component from './Component';

const mapDispatchToProps = {
  onClick: () => push('?player'),
};

export default connect(
  undefined,
  mapDispatchToProps,
)(Component);
