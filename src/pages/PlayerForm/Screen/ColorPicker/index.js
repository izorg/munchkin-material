import { connect } from 'react-redux';
import { goBack, push } from 'connected-react-router/lib/actions';

import Component from './Component';

const mapStateToprops = (state) => ({
  open: state.router.location.search === '?color',
});

const mapDispatchToProps = {
  onOpen: () => push({ search: '?color' }),
  onClose: goBack,
};

export default connect(mapStateToprops, mapDispatchToProps)(Component);
