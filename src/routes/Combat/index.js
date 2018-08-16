import { createMatchSelector } from 'connected-react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ScreenLoader from '../../components/ScreenLoader';

const loader = () => import(/* webpackChunkName: "combat" */ './Screen');

const match = createMatchSelector({ path: '/player/:id/combat' });

const mapStateToProps = createStructuredSelector({
  loader: () => loader,
  match,
});

export default connect(mapStateToProps)(ScreenLoader);
