import connect from 'react-redux/es/connect/connect';

import Component from './Component';

const mapStateToProps = (state) => ({
  monsters: state.combat.monsters,
});

export default connect(mapStateToProps)(Component);
