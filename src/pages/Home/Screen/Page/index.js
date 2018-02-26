import { connect } from 'react-redux';
import { push } from 'connected-react-router/lib/actions';

import Component from './Component';

const mapStateToProps = (state) => ({
  empty: !state.playerList.length,
});

const mapDispatchToProps = {
  onMenuOpen: () => push({ search: '?menu' }),
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
