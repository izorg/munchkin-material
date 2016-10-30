import { connect } from 'react-redux';

import App from '../components/App';

const mapStateToProps = state => ({
  bannerVisible: state.app.bannerVisible,
});

export default connect(mapStateToProps)(App);
