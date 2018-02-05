import { connect } from 'react-redux';

import Component from './Component';

const mapStateToProps = (state) => ({
  monsters: state.combat.monsters,
});

export default connect(mapStateToProps)(Component);
