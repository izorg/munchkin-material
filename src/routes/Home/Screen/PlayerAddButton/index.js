import { connect } from 'react-redux';
import { push } from 'connected-react-router/lib/actions';

import Component from './Component';

const mapDispatchToProps = {
  onClick: () => push('/new'),
};

export default connect(undefined, mapDispatchToProps)(Component);
