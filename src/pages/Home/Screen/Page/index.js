import connect from 'react-redux/es/connect/connect';

import Component from './Component';

const mapStateToProps = (state) => ({
  empty: !state.playerList.length,
});

export default connect(mapStateToProps)(Component);
