import { connect } from 'react-redux';

import Component from './Component';

const mapStateToProps = (state) => ({
  theme: state.app.theme,
});

export default connect(mapStateToProps)(Component);
