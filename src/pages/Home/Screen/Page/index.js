import { connect } from 'react-redux';

import Component from './Component';

const mapStateToProps = (state) => ({
  empty: !state.playerList.length,
});

export default connect(mapStateToProps)(Component);
