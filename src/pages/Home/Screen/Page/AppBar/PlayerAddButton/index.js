import connect from 'react-redux/es/connect/connect';
import { push } from 'connected-react-router/lib/actions';

import Component from './Component';

const mapDispatchToProps = {
  onClick: () => push('/new'),
};

export default connect(undefined, mapDispatchToProps)(Component);
