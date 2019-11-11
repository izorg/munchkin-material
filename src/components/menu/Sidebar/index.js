import { connect } from 'react-redux';

import Component from './Component';

const mapStateToProps = (state) => ({
  collapsed: state.app.menuCollapsed,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
