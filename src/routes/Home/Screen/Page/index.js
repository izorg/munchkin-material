import { connect } from 'react-redux';
import { push } from 'connected-react-router/lib/actions';

import { SINGLE } from '../../modes';
import { modeSelector } from '../../selectors';

import Component from './Component';

const mapStateToProps = (state) => ({
  empty: !state.playerList.length,
  singleMode: modeSelector(state) === SINGLE,
});

const mapDispatchToProps = {
  onMenuOpen: () => push({ search: '?menu' }),
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
