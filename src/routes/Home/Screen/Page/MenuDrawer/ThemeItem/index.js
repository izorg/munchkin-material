import { connect } from 'react-redux';
import { replace } from 'connected-react-router/lib/actions';

import Component from './Component';

const mapDispatchToProps = {
  onClick: () => replace({ search: '?theme' }),
};

export default connect(
  undefined,
  mapDispatchToProps,
)(Component);
