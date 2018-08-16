import { createMatchSelector } from 'connected-react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ScreenLoader from '../../components/ScreenLoader';

const loader = () => import(/* webpackChunkName: "player" */ './Screen');

const match = createMatchSelector({ path: '/player/:id' });

const mapStateToProps = createStructuredSelector({
  loader: () => loader,
  match,
});

export default connect(mapStateToProps)(ScreenLoader);
