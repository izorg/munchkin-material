import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import App from '../components/App';

const mapStateToProps = state => ({
  bannerVisible: state.app.bannerVisible,
});

export default withRouter(connect(mapStateToProps)(App));
